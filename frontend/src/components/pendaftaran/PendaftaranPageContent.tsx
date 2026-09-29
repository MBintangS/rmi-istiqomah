"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button, EmptyState, Input, Label, Select, Skeleton, Textarea } from "@/components/ui";
import { useOpenPendaftaran } from "@/hooks/usePendaftaran";
import { getApiErrorMessage } from "@/lib/api";
import { pesertaFormSchema, type PesertaFormValues } from "@/lib/pendaftaran-form-schema";
import { submitPeserta } from "@/services/pendaftaran.service";

type RegistrationReceipt = {
  name: string;
  age: number;
  whatsapp: string;
  address: string;
  title: string;
  opensAt: string;
  closesAt: string;
};

function RecordedStamp() {
  return (
    <span
      className="inline-flex h-24 w-24 items-center justify-center rounded-full border-2 border-secondary text-secondary"
      aria-hidden="true"
    >
      <span className="flex h-[4.6rem] w-[4.6rem] flex-col items-center justify-center rounded-full border border-secondary/70">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">RMI</span>
        <span className="font-display mt-1 text-sm font-bold tracking-tight">Tercatat</span>
      </span>
    </span>
  );
}

function formatDay(iso: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-caption text-error">
      {message}
    </p>
  );
}

export function PendaftaranPageContent({
  programSlug,
  periodeSlug,
}: {
  programSlug?: string;
  periodeSlug?: string;
}) {
  const { data, isLoading, isError, error, refetch } = useOpenPendaftaran();
  const items = data ?? [];

  const programs = useMemo(() => {
    const map = new Map<string, { slug: string; name: string }>();
    for (const item of items) {
      if (item.program) map.set(item.program.slug, item.program);
    }
    return Array.from(map.values());
  }, [items]);

  const [selectedProgram, setSelectedProgram] = useState(programSlug ?? "");
  const [selectedSlug, setSelectedSlug] = useState(periodeSlug ?? "");

  useEffect(() => {
    if (periodeSlug) {
      const match = items.find((item) => item.slug === periodeSlug);
      if (!match?.program) return;
      setSelectedProgram(match.program.slug);
      setSelectedSlug(match.slug);
      return;
    }
    if (!programSlug) return;
    setSelectedProgram(programSlug);
  }, [items, periodeSlug, programSlug]);

  const pinned = periodeSlug ? items.find((item) => item.slug === periodeSlug) : undefined;
  const forProgram = items.filter((item) => item.program?.slug === selectedProgram);
  const selected =
    pinned ??
    forProgram.find((item) => item.slug === selectedSlug) ??
    (forProgram.length === 1 ? forProgram[0] : undefined);

  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const [focusSummary, setFocusSummary] = useState(false);
  const [receipt, setReceipt] = useState<RegistrationReceipt | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<PesertaFormValues>({
    resolver: zodResolver(pesertaFormSchema),
    mode: "onBlur",
    defaultValues: { name: "", whatsapp: "", age: "", address: "", email: "", notes: "" },
  });

  const errorItems: Array<{ id: string; label: string; message: string }> = [
    { id: "name", label: "Nama", message: errors.name?.message ?? "" },
    { id: "whatsapp", label: "WhatsApp", message: errors.whatsapp?.message ?? "" },
    { id: "age", label: "Usia", message: errors.age?.message ?? "" },
    { id: "address", label: "Alamat", message: errors.address?.message ?? "" },
    { id: "email", label: "Email", message: errors.email?.message ?? "" },
    { id: "notes", label: "Catatan", message: errors.notes?.message ?? "" },
  ].filter((item) => item.message);

  useEffect(() => {
    if (!focusSummary || !summaryRef.current) return;
    summaryRef.current.focus();
    setFocusSummary(false);
  }, [focusSummary, errorItems.length, isSubmitted]);

  useEffect(() => {
    if (!receipt) return;
    successRef.current?.focus();
  }, [receipt]);

  const mutation = useMutation({
    mutationFn: (values: PesertaFormValues) => {
      if (!selected) throw new Error("Pilih pendaftaran terlebih dahulu");
      return submitPeserta(selected.slug, {
        name: values.name,
        whatsapp: values.whatsapp,
        age: Number(values.age),
        address: values.address.trim(),
        email: values.email?.trim() || undefined,
        notes: values.notes?.trim() || undefined,
      });
    },
    onSuccess: (_response, values) => {
      if (!selected) return;
      setReceipt({
        name: values.name.trim(),
        age: Number(values.age),
        whatsapp: values.whatsapp.trim(),
        address: values.address.trim(),
        title: selected.title,
        opensAt: selected.opensAt,
        closesAt: selected.closesAt,
      });
      reset();
    },
    onError: (err) => toast.error(getApiErrorMessage(err, "Gagal mengirim pendaftaran")),
  });

  if (isLoading) {
    return <Skeleton className="h-80 rounded-rmi" />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Pendaftaran tidak bisa dimuat"
        description={getApiErrorMessage(error)}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  if (periodeSlug && !items.some((item) => item.slug === periodeSlug)) {
    return (
      <EmptyState
        title="Pendaftaran ini sudah ditutup"
        description="Periode yang Anda buka tidak sedang menerima peserta. Pilih pendaftaran lain yang masih dibuka."
        actionLabel="Lihat pendaftaran"
        onAction={() => {
          window.location.href = "/pendaftaran";
        }}
      />
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Belum ada pendaftaran yang dibuka"
        description="Pengurus belum membuka periode pendaftaran. Coba lagi nanti atau hubungi pengurus."
      />
    );
  }

  if (receipt) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          {/* <RecordedStamp /> */}
          <div>
            <h2
              ref={successRef}
              tabIndex={-1}
              className="font-display text-3xl font-bold tracking-tight text-heading focus-visible:outline-none"
            >
              Pendaftaran Berhasil
            </h2>
            <p className="text-body mt-2 max-w-[42ch] text-foreground/75">
              Data {receipt.name} sudah masuk untuk {receipt.title}. Silakan tunggu informasi lanjutan dari pengurus.
            </p>
          </div>
        </div>

        <dl className="divide-y divide-secondary/20 border-y border-secondary/20">
          <div className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4">
            <dt className="text-caption font-medium text-foreground/55">Nama</dt>
            <dd className="font-medium text-heading">{receipt.name}</dd>
          </div>
          <div className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4">
            <dt className="text-caption font-medium text-foreground/55">Usia</dt>
            <dd className="text-heading">{receipt.age} tahun</dd>
          </div>
          <div className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4">
            <dt className="text-caption font-medium text-foreground/55">WhatsApp</dt>
            <dd className="text-heading">{receipt.whatsapp}</dd>
          </div>
          <div className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4">
            <dt className="text-caption font-medium text-foreground/55">Alamat</dt>
            <dd className="text-heading">{receipt.address}</dd>
          </div>
          <div className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4">
            <dt className="text-caption font-medium text-foreground/55">Periode</dt>
            <dd className="text-heading">
              {receipt.title}
              <span className="mt-1 block text-caption text-foreground/60">
                {formatDay(receipt.opensAt)} – {formatDay(receipt.closesAt)}
              </span>
            </dd>
          </div>
        </dl>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/" className="min-h-11">
            Kembali ke beranda
          </Button>
          <Button
            type="button"
            variant="outline"
            className="min-h-11"
            onClick={() => setReceipt(null)}
          >
            Daftarkan orang lain
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(
        (values) => mutation.mutate(values),
        () => {
          setFocusSummary(true);
        },
      )}
      className="space-y-6"
      noValidate
    >
      {pinned ? null : (
      <div className="space-y-2">
        <Label htmlFor="program" required>
          Program
        </Label>
        <Select
          id="program"
          value={selectedProgram}
          onChange={(event) => {
            setSelectedProgram(event.target.value);
            setSelectedSlug("");
          }}
        >
          <option value="">Pilih program</option>
          {programs.map((program) => (
            <option key={program.slug} value={program.slug}>
              {program.name}
            </option>
          ))}
        </Select>
      </div>
      )}

      {!pinned && selectedProgram && !programs.some((item) => item.slug === selectedProgram) ? (
        <EmptyState
          title="Belum ada pendaftaran untuk program ini"
          description="Pilih program lain yang sedang membuka pendaftaran."
        />
      ) : null}

      {!pinned && forProgram.length > 1 ? (
        <div className="space-y-2">
          <Label htmlFor="periode" required>
            Periode
          </Label>
          <Select
            id="periode"
            value={selected?.slug ?? ""}
            onChange={(event) => setSelectedSlug(event.target.value)}
          >
            <option value="">Pilih pendaftaran</option>
            {forProgram.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.title}
              </option>
            ))}
          </Select>
        </div>
      ) : null}

      {selected ? (
        <>
          <div className="border-t border-secondary/20 pt-5">
            <p className="text-caption font-semibold uppercase tracking-[0.16em] text-secondary-alt">Formulir peserta</p>
            <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-heading">{selected.title}</h2>
            {selected.description ? (
              <p className="text-body mt-2 max-w-[52ch] text-foreground/75">{selected.description}</p>
            ) : null}
            <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-secondary/20 pt-4">
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-foreground/50">Buka</dt>
                <dd className="mt-1 text-sm font-medium text-heading">{formatDay(selected.opensAt)}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-foreground/50">Tutup</dt>
                <dd className="mt-1 text-sm font-medium text-heading">{formatDay(selected.closesAt)}</dd>
              </div>
            </dl>
          </div>

          {isSubmitted && errorItems.length > 0 ? (
            <div
              ref={summaryRef}
              tabIndex={-1}
              role="alert"
              aria-labelledby="pendaftaran-error-title"
              className="rounded-rmi border border-error/30 bg-error/5 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <p id="pendaftaran-error-title" className="text-sm font-semibold text-heading">
                Periksa isian berikut
              </p>
              <ul className="mt-2 space-y-1">
                {errorItems.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-caption text-error underline-offset-2 hover:underline">
                      {item.label}: {item.message}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="name" required>
                Nama
              </Label>
              <Input
                id="name"
                autoComplete="name"
                placeholder="Nama lengkap"
                error={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                {...register("name")}
              />
              <FieldError id="name-error" message={errors.name?.message} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp" required>
                Nomor WhatsApp
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="08xxxxxxxxxx"
                error={Boolean(errors.whatsapp)}
                aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
                {...register("whatsapp")}
              />
              <FieldError id="whatsapp-error" message={errors.whatsapp?.message} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" required>
                Usia
              </Label>
              <Input
                id="age"
                type="number"
                inputMode="numeric"
                min={1}
                max={100}
                placeholder="17"
                error={Boolean(errors.age)}
                aria-describedby={errors.age ? "age-error" : undefined}
                {...register("age")}
              />
              <FieldError id="age-error" message={errors.age?.message} />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address" required>
                Alamat
              </Label>
              <Textarea
                id="address"
                rows={3}
                autoComplete="street-address"
                placeholder="Alamat lengkap"
                error={Boolean(errors.address)}
                aria-describedby={errors.address ? "address-error" : undefined}
                {...register("address")}
              />
              <FieldError id="address-error" message={errors.address?.message} />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="nama@email.com"
                error={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
              />
              <FieldError id="email-error" message={errors.email?.message} />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="notes">Catatan</Label>
              <Textarea
                id="notes"
                rows={3}
                placeholder="Opsional"
                error={Boolean(errors.notes)}
                aria-describedby={errors.notes ? "notes-error" : undefined}
                {...register("notes")}
              />
              <FieldError id="notes-error" message={errors.notes?.message} />
            </div>
          </div>

          <Button type="submit" className="min-h-11 w-full" disabled={mutation.isPending}>
            {mutation.isPending ? "Mencatat..." : "Catat pendaftaran"}
          </Button>
        </>
      ) : null}
    </form>
  );
}
