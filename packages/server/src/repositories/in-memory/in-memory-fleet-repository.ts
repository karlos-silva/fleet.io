import { Fleet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { FleetsRepository } from '../fleets-repository'

export class InMemoryFleetRepository implements FleetsRepository {
  public items: Fleet[] = []

  async findByName(name: string) {
    const fleet = this.items.find((item) => item.name === name)

    if (!fleet) {
      return null
    }

    return fleet
  }

  async create(data: Prisma.FleetCreateInput) {
    const fleet = {
      id: randomUUID(),
      name: data.name
    }


    return fleet
  }
}
