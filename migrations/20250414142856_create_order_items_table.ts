import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("order_items", (table) => {
    table.increments("id").primary();

    table
      .integer("order_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE");

    table
      .integer("product_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("products")
      .onDelete("CASCADE");

    table.integer("quantity").unsigned().notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("order_items");
}
