import { Fleet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { FleetsRepository } from '../fleets-repository'

export class InMemoryFleetsRepository implements FleetsRepository {
  public items: Fleet[] = []

  async findById(id: string) {
    const fleet = this.items.find((item) => item.id === id)

    if (!fleet) {
      return null
    }

    return fleet
  }

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

    this.items.push(fleet)

    return fleet
  }
}
