import QRCode from 'qrcode'
import { getFrontendUrl } from '#helpers/frontend_url'
import { normalizePresentationCode } from '#helpers/presentation_code'
import Presentation from '#models/presentation'
import Participant from '#models/participant'
import presentationEvents from '#services/presentation_events'
import ParticipantTransformer from '#transformers/participant_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class PresentationsController {
  async store({ serialize }: HttpContext) {
    const presentation = await Presentation.createWithUniqueCode()
    const joinUrl = `${getFrontendUrl()}/join/${presentation.code}`
    const qrCodeDataUrl = await QRCode.toDataURL(joinUrl, {
      width: 320,
      margin: 2,
    })

    return serialize({
      code: presentation.code,
      joinUrl,
      qrCodeDataUrl,
    })
  }

  async show({ params, serialize }: HttpContext) {
    const code = normalizePresentationCode(params.code)
    const presentation = await Presentation.query()
      .where('code', code)
      .preload('participants', (query) => query.orderBy('created_at', 'asc'))
      .firstOrFail()

    return serialize({
      code: presentation.code,
      participants: ParticipantTransformer.transform(presentation.participants),
    })
  }

  async stream({ params, response, serialize }: HttpContext) {
    const code = normalizePresentationCode(params.code)
    const presentation = await Presentation.findByOrFail('code', code)

    response.header('Content-Type', 'text/event-stream')
    response.header('Cache-Control', 'no-cache')
    response.header('Connection', 'keep-alive')

    const nodeResponse = response.response

    const send = (event: string, data: unknown) => {
      nodeResponse.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
    }

    const sendPayload = async (event: string, data: unknown) => {
      if (data && typeof data === 'object') {
        send(event, await serialize.withoutWrapping(data as Record<string, unknown>))
        return
      }

      send(event, data)
    }

    const participants = await Participant.query()
      .where('presentation_id', presentation.id)
      .orderBy('created_at', 'asc')

    await sendPayload('participants', {
      participants: ParticipantTransformer.transform(participants),
    })

    const onEvent = (event: string, data: unknown) => {
      void sendPayload(event, data)
    }
    presentationEvents.subscribe(presentation.code, onEvent)

    const heartbeat = setInterval(() => {
      nodeResponse.write(': heartbeat\n\n')
    }, 15000)

    nodeResponse.on('close', () => {
      clearInterval(heartbeat)
      presentationEvents.unsubscribe(presentation.code, onEvent)
    })
  }
}
