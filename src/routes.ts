import { Router } from 'express'
import IncidentController from './app/controllers/IncidentController'
import OngController from './app/controllers/OngController'
import ProfileController from './app/controllers/ProfileController'
import SessionController from './app/controllers/SessionController'
import IncidentValidator from './app/validators/IncidentValidator'
import OngValidator from './app/validators/OngValidator'
import ProfileValidator from './app/validators/ProfileValidator'

const routes = Router()

routes.post('/sessions', SessionController.store)

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngValidator.store(), OngController.store)

routes.get('/profile', ProfileValidator.index(), ProfileController.index)

routes.get('/incidents', IncidentValidator.index(), IncidentController.index)
routes.post('/incidents', IncidentValidator.store(), IncidentController.store)
routes.delete('/incidents/:id', IncidentValidator.destroy(), IncidentController.destroy)

export default routes
