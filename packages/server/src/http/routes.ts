import { FastifyInstance } from 'fastify'
import { fleets } from './controllers/fleets'

export async function appRoutes(app: FastifyInstance) {
  app.post('/fleets', fleets)
}
