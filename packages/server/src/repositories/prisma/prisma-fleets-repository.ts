import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { FleetsRepository } from '../fleets-repository'

export class PrismaFleetsRepository implements FleetsRepository {
  async findById(id: string) {
    const user = await prisma.fleet.findUnique({
      where: {
        id: id
      }
    })

    return user
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
