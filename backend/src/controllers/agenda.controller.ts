import type { Request, Response } from "express";
import type { FilterQuery } from "mongoose";
import { AppError } from "../middleware/errorHandler";
import { Agenda, type IAgenda, Kegiatan } from "../models";
import type {
  AgendaListQuery,
  CreateAgendaInput,
  UpdateAgendaInput,
} from "../schemas/kegiatan.schema";
import { formatAgenda } from "../utils/agendaMapper";
import { isAdminUser } from "../utils/artikelMapper";
import { buildPaginationMeta, parsePagination } from "../utils/pagination";
import { sendSuccess } from "../utils/response";

const AGENDA_SORT_FIELDS = new Set(["createdAt", "updatedAt", "date", "title"]);

function parseAgendaSort(sort?: string) {
  if (!sort) {
    return { date: 1 as const };
  }

  const field = sort.startsWith("-") ? sort.slice(1) : sort;

  if (!AGENDA_SORT_FIELDS.has(field)) {
    return { date: 1 as const };
  }

  return { [field]: sort.startsWith("-") ? (-1 as const) : (1 as const) };
}

function buildAgendaFilter(query: AgendaListQuery, isAdmin: boolean): FilterQuery<IAgenda> {
  const filter: FilterQuery<IAgenda> = {};

  if (!isAdmin) {
    filter.isPublished = true;
  }

  if (query.search) {
    const regex = new RegExp(query.search, "i");
    filter.$or = [{ title: regex }, { description: regex }];
  }

  return filter;
}

function startOfToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export async function listAgenda(req: Request, res: Response): Promise<void> {
  const query = req.query as unknown as AgendaListQuery;
  const isAdmin = isAdminUser(req.user);
  const { page, limit, skip } = parsePagination(query);
  const filter = buildAgendaFilter(query, isAdmin);
  const sort = parseAgendaSort(query.sort);

  const [items, total] = await Promise.all([
    Agenda.find(filter)
      .populate("eventId", "title slug")
      .sort(sort)
      .skip(skip)
      .limit(limit),
    Agenda.countDocuments(filter),
  ]);

  sendSuccess(res, items.map((item) => formatAgenda(item)), {
    pagination: buildPaginationMeta(page, limit, total),
  });
}

export async function getUpcomingAgenda(_req: Request, res: Response): Promise<void> {
  const items = await Agenda.find({
    isPublished: true,
    date: { $gte: startOfToday() },
  })
    .populate("eventId", "title slug")
    .sort({ date: 1 })
    .limit(5);

  sendSuccess(res, items.map((item) => formatAgenda(item)));
}

export async function getAgendaById(req: Request, res: Response): Promise<void> {
  const isAdmin = isAdminUser(req.user);
  const filter: FilterQuery<IAgenda> = { _id: req.params.id };

  if (!isAdmin) {
    filter.isPublished = true;
  }

  const agenda = await Agenda.findOne(filter).populate("eventId", "title slug");

  if (!agenda) {
    throw new AppError(404, "NOT_FOUND", "Agenda tidak ditemukan");
  }

  sendSuccess(res, formatAgenda(agenda));
}

export async function createAgenda(req: Request, res: Response): Promise<void> {
  const data = req.body as CreateAgendaInput;

  if (data.eventId) {
    const kegiatan = await Kegiatan.findById(data.eventId);

    if (!kegiatan) {
      throw new AppError(400, "VALIDATION_ERROR", "Kegiatan terkait tidak valid");
    }
  }

  const agenda = await Agenda.create({
    title: data.title,
    date: data.date,
    time: data.time,
    location: data.location,
    description: data.description,
    eventId: data.eventId,
    isPublished: data.isPublished ?? false,
  });

  await agenda.populate("eventId", "title slug");

  sendSuccess(res, formatAgenda(agenda), {
    status: 201,
    message: "Agenda berhasil dibuat",
  });
}

export async function updateAgenda(req: Request, res: Response): Promise<void> {
  const data = req.body as UpdateAgendaInput;
  const agenda = await Agenda.findById(req.params.id);

  if (!agenda) {
    throw new AppError(404, "NOT_FOUND", "Agenda tidak ditemukan");
  }

  if (data.eventId) {
    const kegiatan = await Kegiatan.findById(data.eventId);

    if (!kegiatan) {
      throw new AppError(400, "VALIDATION_ERROR", "Kegiatan terkait tidak valid");
    }

    agenda.eventId = kegiatan._id;
  }

  if (data.title !== undefined) agenda.title = data.title;
  if (data.date !== undefined) agenda.date = data.date;
  if (data.time !== undefined) agenda.time = data.time;
  if (data.location !== undefined) agenda.location = data.location;
  if (data.description !== undefined) agenda.description = data.description;
  if (data.isPublished !== undefined) agenda.isPublished = data.isPublished;

  await agenda.save();
  await agenda.populate("eventId", "title slug");

  sendSuccess(res, formatAgenda(agenda), { message: "Agenda berhasil diperbarui" });
}

export async function deleteAgenda(req: Request, res: Response): Promise<void> {
  const agenda = await Agenda.findByIdAndDelete(req.params.id);

  if (!agenda) {
    throw new AppError(404, "NOT_FOUND", "Agenda tidak ditemukan");
  }

  sendSuccess(res, { id: agenda._id.toString() }, { message: "Agenda berhasil dihapus" });
}
