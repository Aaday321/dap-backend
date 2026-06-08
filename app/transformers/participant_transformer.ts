import type Participant from '#models/participant'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class ParticipantTransformer extends BaseTransformer<Participant> {
  toObject() {
    return this.pick(this.resource, ['id', 'username', 'createdAt'])
  }
}
