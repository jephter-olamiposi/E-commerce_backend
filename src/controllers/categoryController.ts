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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};

export const handleGetAllCategories = async (
  _req: Request,
  res: Response
): Promise<any> => {
  try {
    const categories = await getAllCategories();
    return res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred",
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

    const existing = await getCategoryById(Number(id));

    if (!existing) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }

    const updated = await updateCategory(Number(id), data);

    return res.status(200).json({
      status: "success",
      message: "Category updated",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An unexpected error occurred",
    });
  }
};

export const handleDeleteCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = idParamSchema.parse(req.params);

    const existing = await getCategoryById(Number(id));

    if (!existing) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }

    await deleteCategory(Number(id));

    return res.status(200).json({
      status: "success",
      message: "Category deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An unexpected error occurred",
    });
  }
};
