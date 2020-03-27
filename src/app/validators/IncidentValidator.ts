import { celebrate, Joi, Segments } from 'celebrate'
import { RequestHandler } from 'express'

class IncidentValidator {
  index (): RequestHandler {
    return celebrate({
      [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().min(1)
      })
    })
  }

  store (): RequestHandler {
    return celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
      }).unknown(),

      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
      })
    })
  }

  destroy (): RequestHandler {
    return celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
      })
    })
  }
}

export default new IncidentValidator()
