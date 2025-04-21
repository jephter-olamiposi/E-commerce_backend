import { Knex } from "knex";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export async function seed(knex: Knex): Promise<any> {
  const email = process.env.ADMIN_EMAIL!;
  const password = process.env.ADMIN_PASSWORD!;
  const firstName = process.env.ADMIN_FIRSTNAME || "Admin";
  const lastName = process.env.ADMIN_LASTNAME || "";
  const phone = process.env.ADMIN_PHONE || "";

  const existing = await knex("users").where({ email }).first();
  if (existing) return;

  const hashedPassword = await bcrypt.hash(password, 10);

  await knex("users").insert({
    email,
    password: hashedPassword,
    first_name: firstName,
    last_name: lastName,
    phone,
    role: "admin",
    created_at: knex.fn.now(),
    updated_at: knex.fn.now(),
  });

  console.log(`First admin created (email: ${email})`);
}
