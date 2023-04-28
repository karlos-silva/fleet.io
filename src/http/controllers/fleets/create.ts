import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateFleetUseCase } from '@/use-cases/factories/make-create-fleet-use-case'
import { FleetAlreadyExistsError } from '@/use-cases/errors/fleet-already-exists-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createFleetBodySchema = z.object({
    name: z.string(),
  })

  const { name } = createFleetBodySchema.parse(request.body)

  try {
    const createFleetUseCase = makeCreateFleetUseCase()

    await createFleetUseCase.execute({
      name,
    })
  } catch (error) {
    if (error instanceof FleetAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }

  return reply.status(201).send()
}
