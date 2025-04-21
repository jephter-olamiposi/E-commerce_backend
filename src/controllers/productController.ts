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
    const categoryId = req.query.category_id;
    let products;

    if (categoryId) {
      products = await getAllProducts(Number(categoryId));
    } else {
      products = await getAllProducts();
    }

    return res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
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
    const data = updateProductSchema.parse(req.body);
    const updated = await updateProduct(Number(id), data);

    if (!updated) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Product updated",
      data: updated,
    });
  } catch (error) {
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
    const deleted = await deleteProduct(Number(id));

    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Product deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};
