import * as Knex from 'knex'

export function up (knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable('ongs', function (table) {
    table.string('id').primary()

    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('whatsapp').notNullable()
    table.string('city').notNullable()
    table.string('uf', 2).notNullable()
  })
}

export function down (knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable('ongs')
}
