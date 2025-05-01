import db from "../config/knex";
import {
  CreateAddressInput,
  UpdateAddressInput,
} from "../schemas/addressSchema";

export const createAddress = async (
  userId: number,
  data: CreateAddressInput
) => {
  const [address] = await db("addresses")
    .insert({ ...data, user_id: userId })
    .returning("*");
  return address;
};

export const getAddressesByUser = async (userId: number) => {
  return db("addresses")
    .where({ user_id: userId })
    .orderBy("created_at", "desc");
};

export const getAddressById = async (id: number, userId: number) => {
  return db("addresses").where({ id, user_id: userId }).first();
};

export const updateAddress = async (
  id: number,
  userId: number,
  data: UpdateAddressInput
) => {
  const [updated] = await db("addresses")
    .where({ id, user_id: userId })
    .update({ ...data, updated_at: db.fn.now() })
    .returning("*");
  return updated;
};

export const deleteAddress = async (id: number, userId: number) => {
  const deleted = await db("addresses").where({ id, user_id: userId }).del();
  return deleted;
};
