import { FastifyInstance } from 'fastify'
import { create } from './create'
import { deleteVehicle } from './delete-vehicle'


export async function vehiclesRoutes(app: FastifyInstance) {
  app.post('/vehicles', create)

  app.delete('/vehicles/:vehicleId', deleteVehicle)
}
