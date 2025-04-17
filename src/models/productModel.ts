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
    ]);
  return product;
};

export const getAllProducts = async () => {
  return db("products").select("*");
};

export const getProductById = async (id: number) => {
  return db("products").where({ id }).first();
};

export const updateProduct = async (id: number, data: UpdateProductInput) => {
  const [updated] = await db("products")
    .where({ id })
    .update(data)
    .returning([
      "id",
      "name",
      "price",
      "category_id",
      "image_url",
      "description",
      "created_at",
    ]);
  return updated;
};

export const deleteProduct = async (id: number) => {
  return db("products").where({ id }).del();
};
