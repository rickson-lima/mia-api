import express from 'express'
import ContributorController from './app/controllers/ContributorController'

const routes = express.Router()

routes.post('/api/contribuidor', ContributorController.store)
routes.get('/api/contribuidores', ContributorController.index)

export default routes
