import express from 'express'
import ContributorController from './app/controllers/ContributorController'
import SessionController from './app/controllers/SessionController'
import authMiddleware from './app/middlewares/auth'

const routes = express.Router()

routes.post('/api/contributor', ContributorController.create)
routes.put('/api/contributor', ContributorController.update)

routes.post('/api/auth', SessionController.store)

routes.use(authMiddleware)

routes.get('/api/contributors', ContributorController.index)

export default routes
