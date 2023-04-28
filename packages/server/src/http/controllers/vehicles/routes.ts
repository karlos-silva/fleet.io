import { FastifyInstance } from 'fastify'
import { create } from './create'
import { deleteVehicle } from './delete-vehicle'
import { list } from './list'


export async function vehiclesRoutes(app: FastifyInstance) {
  app.post('/vehicles', create)

  app.get('/vehicles/:fleetId', list)

  app.delete('/vehicles/:chassisId', deleteVehicle)
}
