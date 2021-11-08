import express from 'express'
import ContributorController from './app/controllers/ContributorController'
import SessionController from './app/controllers/SessionController'

import authMiddleware from './app/middlewares/auth'
import contributorInfoMiddleware from './app/middlewares/contributorInfo'
import intentMiddleware from './app/middlewares/intent'

const routes = express.Router()

// insert a new contributor to database
routes.post('/api/contributor', ContributorController.create)

// get
routes.get('/api/contributor', ContributorController.indexOne)

// store new data
routes.post(
  '/api/contributor/data',
  contributorInfoMiddleware,
  intentMiddleware,
  ContributorController.storeNewData
)

// update data
routes.put(
  '/api/contributor/data',
  contributorInfoMiddleware,
  intentMiddleware,
  ContributorController.updateData
)

// login route to access dashboard
routes.post('/api/auth', SessionController.store)

routes.get('/api/contributors', authMiddleware, ContributorController.index)

export default routes
