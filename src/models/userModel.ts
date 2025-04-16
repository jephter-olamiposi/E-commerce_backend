import db from "../config/knex";

type NewUser = {
  email: string;
  password: string;
  phone?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  role: "admin" | "customer";
};

export const createUser = async (user: NewUser) => {
  const [createdUser] = await db("users")
    .insert(user)
    .returning(["id", "email", "role", "first_name", "last_name"]);
  return createdUser;
};

export const findUserByEmail = async (email: string) => {
  return db("users").where({ email }).first();
};

export const findUserById = async (id: number) => {
  return db("users").where({ id }).first();
};
