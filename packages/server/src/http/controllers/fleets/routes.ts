import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function appRoutes(app: FastifyInstance) {
  app.post('/fleets', create)
}
