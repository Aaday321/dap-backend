import { randomUUID } from 'node:crypto'
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Presentation from '#models/presentation'

export default class Participant extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare presentationId: number

  @column()
  declare username: string

  @column()
  declare token: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Presentation)
  declare presentation: BelongsTo<typeof Presentation>

  static createForPresentation(presentationId: number, username: string) {
    return this.create({
      presentationId,
      username,
      token: randomUUID(),
    })
  }
}
