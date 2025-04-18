import db from "../config/knex";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../schemas/categorySchema";

export const createCategory = async (data: CreateCategoryInput) => {
  const [category] = await db("categories")
    .insert(data)
    .returning(["id", "name", "created_at"]);
  return category;
};

export const getAllCategories = async () => {
  return db("categories").select("*");
};

export const getCategoryById = async (id: number) => {
  return db("categories").where({ id }).first();
};

export const updateCategory = async (id: number, data: UpdateCategoryInput) => {
  const [updated] = await db("categories")
    .where({ id })
    .update({ ...data, updated_at: db.fn.now() })
    .returning(["id", "name", "created_at", "updated_at"]);

  if (!updated) {
    throw new Error("Category not found");
  }

  return updated;
};

export const deleteCategory = async (id: number) => {
  const deleted = await db("categories").where({ id }).del();
  if (!deleted) {
    throw new Error("Category not found");
  }
  return deleted;
};
