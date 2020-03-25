import { Router } from 'express'
import IncidentController from './app/controllers/IncidentController'
import OngController from './app/controllers/OngController'
import ProfileController from './app/controllers/ProfileController'
import SessionController from './app/controllers/SessionController'

const routes = Router()

routes.post('/sessions', SessionController.store)

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.store)

routes.get('/profile', ProfileController.index)

routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.store)
routes.delete('/incidents/:id', IncidentController.destroy)

export default routes
