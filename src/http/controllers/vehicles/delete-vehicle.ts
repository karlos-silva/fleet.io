import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeDeleteVehicleUseCase } from '@/use-cases/factories/make-delete-vehicle-use-case'
import { VehicleNotFoundError } from '@/use-cases/errors/vehicle-not-found-error'

export async function deleteVehicle(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteVehicleParamsSchema = z.object({
    chassisId: z.string(),
  })

  const { chassisId } = deleteVehicleParamsSchema.parse(request.params)

  try {
    const deleteVehicleUseCase = makeDeleteVehicleUseCase()

    await deleteVehicleUseCase.execute({
      chassisId,
    })
  } catch (error) {
    if (error instanceof VehicleNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }

  return reply.status(202).send({
    message: 'Vehicle Deleted',
  })
}
