import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'participants'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .integer('presentation_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('presentations')
        .onDelete('CASCADE')
      table.string('username', 50).notNullable()
      table.string('token', 64).notNullable().unique()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['presentation_id', 'username'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
