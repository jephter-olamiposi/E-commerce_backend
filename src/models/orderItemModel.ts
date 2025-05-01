import db from "../config/knex";

export const getOrderItemsByOrderId = async (orderId: number) => {
  return db("order_items")
    .where({ order_id: orderId })
    .join("products", "order_items.product_id", "products.id")
    .select(
      "products.id as product_id",
      "products.name",
      "products.price as unit_price",
      "order_items.quantity"
    );
};
