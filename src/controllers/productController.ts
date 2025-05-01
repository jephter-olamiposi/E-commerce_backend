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
    return res.status(201).json({
      status: "success",
      message: "Product created",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};

export const handleGetAllProducts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const categoryId = req.query.category_id
      ? Number(req.query.category_id)
      : undefined;

    const products = await getAllProducts(categoryId);

    return res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred",
    });
  }
};

export const handleGetProductById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const product = await getProductById(Number(id));

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};

export const handleUpdateProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const body = updateProductSchema.parse(req.body);

    const existing = await getProductById(Number(id));

    if (!existing) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    const updated = await updateProduct(Number(id), body);

    return res.status(200).json({
      status: "success",
      message: "Product updated",
      data: updated,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};

export const handleDeleteProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = idParamSchema.parse(req.params);

    const existing = await getProductById(Number(id));

    if (!existing) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    await deleteProduct(Number(id));

    return res.status(200).json({
      status: "success",
      message: "Product deleted",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "An unexpected error occurred",
    });
  }
};
