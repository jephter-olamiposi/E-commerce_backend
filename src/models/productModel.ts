import db from "../config/knex";
import {
  CreateProductInput,
  UpdateProductInput,
} from "../schemas/productSchema";

export const createProduct = async (data: CreateProductInput) => {
  const [product] = await db("products")
    .insert(data)
    .returning([
      "id",
      "name",
      "price",
      "category_id",
      "image_url",
      "description",
      "created_at",
      "updated_at",
    ]);
  return product;
};

export const getAllProducts = async (categoryId?: number) => {
  const query = db("products").select([
    "id",
    "name",
    "price",
    "category_id",
    "image_url",
    "description",
    "created_at",
    "updated_at",
  ]);

  if (categoryId) {
    query.where({ category_id: categoryId });
  }

  return query;
};

export const getProductById = async (id: number) => {
  return db("products").where({ id }).first();
};

export const updateProduct = async (id: number, data: UpdateProductInput) => {
  const [updated] = await db("products")
    .where({ id })
    .update({ ...data, updated_at: db.fn.now() })
    .returning([
      "id",
      "name",
      "price",
      "category_id",
      "image_url",
      "description",
      "created_at",
      "updated_at",
    ]);
  return updated ?? null;
};

export const deleteProduct = async (id: number) => {
  const deleted = await db("products").where({ id }).del();
  return deleted > 0;
};
