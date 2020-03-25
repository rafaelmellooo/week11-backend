import * as Knex from 'knex'

export function up (knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable('incidents', function (table) {
    table.increments()

    table.string('title').notNullable()
    table.string('description').notNullable()
    table.decimal('value').notNullable()

    table.string('ong_id').notNullable()
    table.foreign('ong_id').references('id').inTable('ongs')
  })
}

export function down (knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable('incidents')
}
