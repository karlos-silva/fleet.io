import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { FleetNotFoundError } from '@/use-cases/errors/fleet-not-found-error'
import { makeFetchAllVehiclesUseCase } from '@/use-cases/factories/make-fetch-all-vehicles-use-case'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const listVehiclesParamsSchema = z.object({
    fleetId: z.string().uuid()
  })

  const { fleetId } = listVehiclesParamsSchema.parse(request.params)

  try {
    const fetchAllVehiclesUseCase = makeFetchAllVehiclesUseCase()

    const { vehicles } = await fetchAllVehiclesUseCase.execute({
      fleetId
    })

    return reply.status(200).send(vehicles)

  } catch (error) {

    if (error instanceof FleetNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }


}
