import db from "../config/knex";
import { CreateOrderInput } from "../schemas/orderSchema";

export const createOrder = async (userId: number, data: CreateOrderInput) => {
  return db.transaction(async (trx) => {
    const [address] = await trx("addresses")
      .insert({ ...data.address, user_id: userId })
      .returning("*");

    const [order] = await trx("orders")
      .insert({
        user_id: userId,
        address_id: address.id,
        status: "pending",
      })
      .returning("*");

    const orderItems = data.items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
    }));

    await trx("order_items").insert(orderItems);

    return { order, address, items: orderItems };
  });
};

export const getOrderById = async (orderId: number) => {
  const order = await db("orders").where({ id: orderId }).first();

  if (!order) return null;

  const address = await db("addresses").where({ id: order.address_id }).first();

  const items = await db("order_items")
    .where({ order_id: order.id })
    .join("products", "order_items.product_id", "products.id")
    .select(
      "products.id as product_id",
      "products.name",
      "products.price",
      "order_items.quantity"
    );

  return { order, address, items };
};

export const getOrdersByUser = async (userId: number) => {
  return db("orders").where({ user_id: userId }).orderBy("id", "desc");
};
