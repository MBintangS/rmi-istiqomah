import "dotenv/config";
import { connectDatabase, disconnectDatabase } from "../config/database";
import { User } from "../models";

const DEFAULT_EMAIL = "admin@rmi-masjid.org";
const DEFAULT_PASSWORD = "AdminRMI123";
const DEFAULT_NAME = "Super Admin RMI";

async function seedSuperAdmin() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined");
  }

  await connectDatabase(mongoUri);

  const email = (process.env.SEED_ADMIN_EMAIL ?? DEFAULT_EMAIL).toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD ?? DEFAULT_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME ?? DEFAULT_NAME;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    console.log(`Superadmin already exists: ${email}`);
    await disconnectDatabase();
    return;
  }

  await User.create({
    name,
    email,
    password,
    role: "superadmin",
    isActive: true,
  });

  console.log("Superadmin created successfully");
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
  console.log("Ganti password default setelah login pertama.");

  await disconnectDatabase();
}

seedSuperAdmin()
  .then(() => process.exit(0))
  .catch(async (error) => {
    console.error("Failed to seed superadmin:", error);
    await disconnectDatabase().catch(() => undefined);
    process.exit(1);
  });
