import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function fleetsRoutes(app: FastifyInstance) {
  app.post('/fleets', create)
}
