import { randomBytes } from 'node:crypto'
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Participant from '#models/participant'

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function generateCode(length = 6) {
  const bytes = randomBytes(length)
  return Array.from(bytes, (byte) => CODE_CHARS[byte % CODE_CHARS.length]).join('')
}

export default class Presentation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare code: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Participant)
  declare participants: HasMany<typeof Participant>

  static async createWithUniqueCode(maxAttempts = 10) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const code = generateCode()
      const existing = await this.findBy('code', code)
      if (!existing) {
        return this.create({ code })
      }
    }
    throw new Error('Unable to generate a unique presentation code')
  }
}
