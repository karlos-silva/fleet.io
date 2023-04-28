import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateVehicleUseCase } from '@/use-cases/factories/make-create-vehicle-use-case'
import { FleetNotFoundError } from '@/use-cases/errors/fleet-not-found-error'
import { VehicleAlreadyExistsError } from '@/use-cases/errors/vehicle-already-exists'
import { BusPassengerIncorrectError } from '@/use-cases/errors/bus-passenger-incorrect-error'
import { CarPassengerIncorrectError } from '@/use-cases/errors/car-passenger-incorrect-error'
import { TruckPassengerIncorrectError } from '@/use-cases/errors/truck-passenger-incorrect-error'
import { makeUpdateVehicleUseCase } from '@/use-cases/factories/make-update-vehicle-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateVehicleBodySchema = z.object({
    color: z.string(),
  })
  const updateVehicleParamsSchema = z.object({
    chassisId: z.string()
  })

  const { color } = updateVehicleBodySchema.parse(request.body)
  const { chassisId } = updateVehicleParamsSchema.parse(request.params)

  const updateVehicleUseCase = makeUpdateVehicleUseCase()

  await updateVehicleUseCase.execute({
    color,
    chassisId
  })
  return reply.status(200).send({
    message: "color updated"
  })
}
