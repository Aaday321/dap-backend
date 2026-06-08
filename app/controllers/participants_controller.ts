import { normalizePresentationCode } from '#helpers/presentation_code'
import Presentation from '#models/presentation'
import Participant from '#models/participant'
import presentationEvents from '#services/presentation_events'
import { joinPresentationValidator } from '#validators/presentation'
import ParticipantTransformer from '#transformers/participant_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class ParticipantsController {
  async store({ params, request, serialize }: HttpContext) {
    const presentation = await Presentation.findByOrFail(
      'code',
      normalizePresentationCode(params.code)
    )
    const { username } = await request.validateUsing(joinPresentationValidator)

    const existing = await Participant.query()
      .where('presentation_id', presentation.id)
      .where('username', username)
      .first()

    if (existing) {
      return serialize({
        participant: ParticipantTransformer.transform(existing),
        token: existing.token,
      })
    }

    const participant = await Participant.createForPresentation(presentation.id, username)

    presentationEvents.emit(presentation.code, 'participant_joined', {
      participant: ParticipantTransformer.transform(participant),
    })

    const participants = await Participant.query()
      .where('presentation_id', presentation.id)
      .orderBy('created_at', 'asc')

    presentationEvents.emit(presentation.code, 'participants', {
      participants: ParticipantTransformer.transform(participants),
    })

    return serialize({
      participant: ParticipantTransformer.transform(participant),
      token: participant.token,
    })
  }
}
