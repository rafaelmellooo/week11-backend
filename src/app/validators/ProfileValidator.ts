import { celebrate, Joi, Segments } from 'celebrate'
import { RequestHandler } from 'express'

class ProfileValidator {
  index (): RequestHandler {
    return celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
      }).unknown()
    })
  }
}

export default new ProfileValidator()
