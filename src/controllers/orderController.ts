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
      return res.status(401).json({ error: "Unauthorized" });
    }
    const data = createOrderSchema.parse(req.body);
    const result = await createOrder(user.userId, data);

    return res.status(201).json({
      message: "Order placed successfully",
      order: result.order,
      address: result.address,
      items: result.items,
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const handleGetUserOrders = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const orders = await getOrdersByUser(user.userId);
    return res.json(orders);
  } catch (error: any) {
    return res.status(500).json({ error: "Could not fetch orders" });
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
      return res.status(404).json({ message: "Order not found" });
    }

    return res.json(order);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
