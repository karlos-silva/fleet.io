import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateVehicleUseCase } from '@/use-cases/factories/make-create-vehicle-use-case'
import { FleetNotFoundError } from '@/use-cases/errors/fleet-not-found-error'
import { VehicleAlreadyExistsError } from '@/use-cases/errors/vehicle-already-exists'
import { BusPassengerIncorrectError } from '@/use-cases/errors/bus-passenger-incorrect-error'
import { CarPassengerIncorrectError } from '@/use-cases/errors/car-passenger-incorrect-error'
import { TruckPassengerIncorrectError } from '@/use-cases/errors/truck-passenger-incorrect-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createVehicleBodySchema = z.object({
    type: z.enum(['BUS', 'TRUCK', 'CAR']),
    passengers: z.number(),
    color: z.string(),
    chassisSeries: z.string(),
    chassisNumber: z.number(),
    fleetId: z.string().uuid(),
  })

  const { type, passengers, color, chassisNumber, chassisSeries, fleetId } =
    createVehicleBodySchema.parse(request.body)

  try {
    const createVehicleUseCase = makeCreateVehicleUseCase()

    await createVehicleUseCase.execute({
      type,
      passengers,
      color,
      chassisNumber,
      chassisSeries,
      fleetId,
    })
  } catch (error) {
    if (error instanceof FleetNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    if (error instanceof VehicleAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
    if (error instanceof BusPassengerIncorrectError) {
      return reply.status(409).send({ message: error.message })
    }
    if (error instanceof CarPassengerIncorrectError) {
      return reply.status(409).send({ message: error.message })
    }
    if (error instanceof TruckPassengerIncorrectError) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }

  return reply.status(201).send()
}
