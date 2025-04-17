import { Request, Response } from "express";
import {
  createProductSchema,
  updateProductSchema,
  idParamSchema,
} from "../schemas/productSchema";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../models/productModel";

export const handleCreateProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const data = createProductSchema.parse(req.body);
    const product = await createProduct(data);
    return res.status(201).json({ message: "Product created", product });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const handleGetAllProducts = async (
  _req: Request,
  res: Response
): Promise<any> => {
  const products = await getAllProducts();
  return res.json(products);
};

export const handleGetProductById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const product = await getProductById(Number(id));
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const handleUpdateProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const data = updateProductSchema.parse(req.body);
    const updated = await updateProduct(Number(id), data);
    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({ message: "Product updated", product: updated });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const handleDeleteProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const deleted = await deleteProduct(Number(id));
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({ message: "Product deleted" });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
