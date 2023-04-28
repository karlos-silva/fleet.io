import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeUpdateVehicleUseCase } from '@/use-cases/factories/make-update-vehicle-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateVehicleBodySchema = z.object({
    color: z.string(),
  })
  const updateVehicleParamsSchema = z.object({
    chassisId: z.string(),
  })

  const { color } = updateVehicleBodySchema.parse(request.body)
  const { chassisId } = updateVehicleParamsSchema.parse(request.params)

  const updateVehicleUseCase = makeUpdateVehicleUseCase()

  await updateVehicleUseCase.execute({
    color,
    chassisId,
  })
  return reply.status(200).send({
    message: 'color updated',
  })
}
