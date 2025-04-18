import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", (table: Knex.AlterTableBuilder) => {
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

  await knex.schema.alterTable("products", (table: Knex.AlterTableBuilder) => {
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

  await knex.schema.alterTable(
    "categories",
    (table: Knex.AlterTableBuilder) => {
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    }
  );

  await knex.schema.alterTable("orders", (table: Knex.AlterTableBuilder) => {
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

  await knex.schema.alterTable("addresses", (table: Knex.AlterTableBuilder) => {
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", (table: Knex.AlterTableBuilder) => {
    table.dropColumn("updated_at");
  });

  await knex.schema.alterTable("products", (table: Knex.AlterTableBuilder) => {
    table.dropColumn("updated_at");
  });

  await knex.schema.alterTable(
    "categories",
    (table: Knex.AlterTableBuilder) => {
      table.dropColumn("updated_at");
    }
  );

  await knex.schema.alterTable("orders", (table: Knex.AlterTableBuilder) => {
    table.dropColumn("created_at");
    table.dropColumn("updated_at");
  });

  await knex.schema.alterTable("addresses", (table: Knex.AlterTableBuilder) => {
    table.dropColumn("created_at");
    table.dropColumn("updated_at");
  });
}
