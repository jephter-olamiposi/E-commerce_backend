import db from "../config/knex";
import { CreateOrderInput } from "../schemas/orderSchema";

export const createOrder = async (userId: number, data: CreateOrderInput) => {
  return db.transaction(async (trx) => {
    const productIds = data.items.map((item) => item.product_id);
    const products = await trx("products").whereIn("id", productIds);

    if (products.length !== productIds.length) {
      throw new Error("One or more product IDs are invalid");
    }

    const [address] = await trx("addresses")
      .insert({ ...data.address, user_id: userId })
      .returning([
        "id",
        "street",
        "city",
        "state",
        "zip_code",
        "country",
        "created_at",
        "updated_at",
      ]);

    const [order] = await trx("orders")
      .insert({
        user_id: userId,
        address_id: address.id,
        status: "pending",
      })
      .returning(["id", "user_id", "address_id", "status", "created_at"]);

    const orderItems = products.map((product) => {
      const quantity =
        data.items.find((i) => i.product_id === product.id)?.quantity || 1;
      return {
        order_id: order.id,
        product_id: product.id,
        quantity,
        unit_price: product.price,
      };
    });

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
      "order_items.quantity",
      "order_items.unit_price"
    );

  return { order, address, items };
};

export const getOrdersByUser = async (userId: number) => {
  return db("orders").where({ user_id: userId }).orderBy("created_at", "desc");
};
