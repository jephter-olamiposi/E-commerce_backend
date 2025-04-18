import { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
  const existing = await knex("users")
    .where({ email: "admin@example.com" })
    .first();
  if (existing) return;

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await knex("users").insert({
    email: "admin@example.com",
    password: hashedPassword,
    first_name: "Super",
    last_name: "Admin",
    phone: "0000000000",
    role: "admin",
    created_at: knex.fn.now(),
    updated_at: knex.fn.now(),
  });

  console.log(
    " First admin created (email: admin@example.com, password: admin123)"
  );
}
