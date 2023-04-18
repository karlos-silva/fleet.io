import { Prisma, Vehicle } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { VehiclesRepository } from '../vehicles-repository'

export class InMemoryVehiclesRepository implements VehiclesRepository {
  public items: Vehicle[] = []
  async findByChassisId(chassis_id: string) {
    const vehicle = this.items.find((item) => item.chassis_id === chassis_id)

    if (!vehicle) {
      return null
    }

    return vehicle
  }

  async create(data: Prisma.VehicleUncheckedCreateInput) {
    const vehicle = {
      id: randomUUID(),
      type: data.type,
      passengers: data.passengers,
      color: data.color,
      chassis_id: data.chassis_id,
      fleet_id: data.fleet_id
    }

    this.items.push(vehicle)

    return vehicle
  }
}
