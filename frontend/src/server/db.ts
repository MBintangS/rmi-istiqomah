import "server-only";
import mongoose from "mongoose";
import { AppError } from "@/server/errors";
import { getServerEnv } from "@/server/env";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cache: MongooseCache = globalForMongoose.mongooseCache ?? { conn: null, promise: null };
globalForMongoose.mongooseCache = cache;

export async function connectDb(): Promise<typeof mongoose> {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    const { mongodbUri } = getServerEnv();
    mongoose.set("strictQuery", true);
    cache.promise = mongoose.connect(mongodbUri, {
      bufferCommands: false,
      maxPoolSize: 10,
    });
  }

  try {
    cache.conn = await cache.promise;
    return cache.conn;
  } catch {
    cache.promise = null;
    throw new AppError(503, "DB_UNAVAILABLE", "Tidak dapat terhubung ke database");
  }
}
