import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaFleetsRepository } from '@/repositories/prisma/prisma-fleets-repository'
import { CreateFleetUseCase } from '@/use-cases/create-fleet'
import { FleetAlreadyExistsError } from '@/use-cases/errors/fleet-already-exists-error'

export async function fleets(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
  })

  const { name } = registerBodySchema.parse(request.body)

  try {
    const fleetsRepository = new PrismaFleetsRepository()
    const createFleetUseCase = new CreateFleetUseCase(fleetsRepository)

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
