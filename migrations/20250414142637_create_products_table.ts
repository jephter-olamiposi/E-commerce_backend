import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.text("description");
    table.decimal("price", 10, 2).notNullable();
    table.string("image_url");
    table
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("categories")
      .onDelete("SET NULL");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("products");
}
