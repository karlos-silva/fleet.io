import { FastifyInstance } from 'fastify'
import { create } from './create'


export async function vehiclesRoutes(app: FastifyInstance) {
  app.post('/vehicles', create)
}
