import db from "../config/knex";
import { UserRole } from "../schemas/userSchema";

type NewUser = {
  email: string;
  password: string;
  phone?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  role: UserRole;
};

export const createUser = async (user: NewUser) => {
  const [createdUser] = await db("users")
    .insert({
      email: user.email,
      password: user.password,
      phone: user.phone,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      role: user.role,
    })
    .returning([
      "id",
      "email",
      "role",
      "first_name",
      "last_name",
      "created_at",
      "updated_at",
    ]);

  return createdUser;
};

export const findUserByEmail = async (email: string) => {
  return db("users").whereRaw("LOWER(email) = ?", email.toLowerCase()).first();
};

export const findUserById = async (id: number) => {
  return db("users").where({ id }).first();
};
