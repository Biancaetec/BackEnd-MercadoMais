/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('usuario', (table) => {
    table.increments('id_usuario').primary();
    table.string('nome').notNullable();
    table.string('email').notNullable();
    table.string('senha').notNullable();
    table.string('funcao').notNullable();
    table
      .integer('id_restaurante')
      .unsigned()
      .references('id_restaurante')
      .inTable('restaurante')
      .onDelete('CASCADE')
      .notNullable();
    table.boolean('ativo').notNullable().defaultTo(true);

    table.index(['email', 'senha'], 'login');
    table.index(['nome'], 'nome');
  });
}

export function down(knex) {
  return knex.schema.dropTable('usuario');
}
