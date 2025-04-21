import { Request, Response } from "express";
import { createOrderSchema, idParamSchema } from "../schemas/orderSchema";
import {
  createOrder,
  getOrderById,
  getOrdersByUser,
} from "../models/orderModel";

export const handleCreateOrder = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }

    const data = createOrderSchema.parse(req.body);
    const result = await createOrder(user.userId, data);

    return res.status(201).json({
      status: "success",
      message: "Order placed successfully",
      data: {
        order: result.order,
        address: result.address,
        items: result.items,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};

export const handleGetUserOrders = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }

    const orders = await getOrdersByUser(user.userId);
    return res.status(200).json({
      status: "success",
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};

export const handleGetOrderById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const order = await getOrderById(Number(id));

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};
