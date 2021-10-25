import express from 'express'
import ContributorController from './app/controllers/ContributorController'
import SessionController from './app/controllers/SessionController'
import authMiddleware from './app/middlewares/auth'

const routes = express.Router()

routes.post('/api/contributor', ContributorController.create)
routes.put('/api/contributor/cpf', ContributorController.storeCpf)
routes.put('/api/contributor/email', ContributorController.storeEmail)
routes.put('/api/contributor/telefone', ContributorController.storePhone)
routes.put('/api/contributor/cep', ContributorController.storeCep)
routes.put('/api/contributor/numero', ContributorController.storeNumero)

routes.post('/api/auth', SessionController.store)

routes.use(authMiddleware)

routes.get('/api/contributors', ContributorController.index)

export default routes
