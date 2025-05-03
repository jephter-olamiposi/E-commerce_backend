import { Request, Response } from "express";
import {
  createAddress,
  getAddressesByUser,
  getAddressById,
  updateAddress,
  deleteAddress,
} from "../models/addressModel";
import {
  createAddressSchema,
  updateAddressSchema,
  addressIdParamSchema,
} from "../schemas/addressSchema";

export const handleCreateAddress = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const data = createAddressSchema.parse(req.body);
    const address = await createAddress(req.user!.userId, data);
    return res.status(201).json({ status: "success", data: address });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

export const handleGetAddresses = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const addresses = await getAddressesByUser(req.user!.userId);
    return res.status(200).json({ status: "success", data: addresses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

export const handleGetAddressById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = addressIdParamSchema.parse(req.params);
    const address = await getAddressById(Number(id), req.user!.userId);
    if (!address) {
      return res
        .status(404)
        .json({ status: "error", message: "Address not found" });
    }
    return res.status(200).json({ status: "success", data: address });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

export const handleUpdateAddress = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = addressIdParamSchema.parse(req.params);
    const existing = await getAddressById(Number(id), req.user!.userId);
    if (!existing) {
      return res
        .status(404)
        .json({ status: "error", message: "Address not found" });
    }

    const data = updateAddressSchema.parse(req.body);
    const updated = await updateAddress(Number(id), req.user!.userId, data);
    return res.status(200).json({ status: "success", data: updated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

export const handleDeleteAddress = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = addressIdParamSchema.parse(req.params);
    const deleted = await deleteAddress(Number(id), req.user!.userId);
    if (!deleted) {
      return res
        .status(404)
        .json({ status: "error", message: "Address not found" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "Address deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
