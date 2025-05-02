import { Request, Response } from "express";
import { orderIdParamSchema } from "../schemas/orderItemSchema";
import { getOrderItemsByOrderId } from "../models/orderItemModel";

export const handleGetOrderItems = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = orderIdParamSchema.parse(req.params);
    const items = await getOrderItemsByOrderId(Number(id));

    return res.status(200).json({
      status: "success",
      data: items,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred ",
    });
  }
};
