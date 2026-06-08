import vine from '@vinejs/vine'

export const joinPresentationValidator = vine.create({
  username: vine.string().trim().minLength(2).maxLength(50),
})
