import { Request, Response } from "express";
import {
  createCategorySchema,
  updateCategorySchema,
  idParamSchema,
} from "../schemas/categorySchema";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../models/categoryModel";

export const handleCreateCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const data = createCategorySchema.parse(req.body);
    const category = await createCategory(data);
    return res.status(201).json({
      status: "success",
      message: "Category created",
      data: category,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message || "Invalid input",
    });
  }
};

export const handleGetAllCategories = async (
  _req: Request,
  res: Response
): Promise<any> => {
  const categories = await getAllCategories();
  return res.status(200).json({
    status: "success",
    data: categories,
  });
};

export const handleGetCategoryById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const category = await getCategoryById(Number(id));
    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message || "Invalid input",
    });
  }
};

export const handleUpdateCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const data = updateCategorySchema.parse(req.body);
    const updated = await updateCategory(Number(id), data);
    if (!updated) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Category updated",
      data: updated,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message || "Invalid input",
    });
  }
};

export const handleDeleteCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const deleted = await deleteCategory(Number(id));
    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Category deleted",
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message || "Invalid input",
    });
  }
};
