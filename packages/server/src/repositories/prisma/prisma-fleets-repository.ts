import { prisma } from '@/lib/prisma'
import { Fleet, Prisma } from '@prisma/client'
import { FleetsRepository } from '../fleets-repository'

export class PrismaFleetsRepository implements FleetsRepository {
  findById(id: string): Promise<Fleet | null> {
    throw new Error('Method not implemented.')
  }
  async findByName(name: string) {
    const user = await prisma.fleet.findUnique({
      where: {
        name,
      },
    })

    return user
  }

  async create(data: Prisma.FleetCreateInput) {
    const user = await prisma.fleet.create({
      data,
    })
    return user
  }
}
