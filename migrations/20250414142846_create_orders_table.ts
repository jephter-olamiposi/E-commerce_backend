import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("orders", (table) => {
    table.increments("id").primary();

    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table
      .integer("address_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("addresses")
      .onDelete("CASCADE");

    table.string("status").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("orders");
}
