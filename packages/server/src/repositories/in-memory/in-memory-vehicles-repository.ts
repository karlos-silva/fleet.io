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

  async deleteByChassisId(chassis_id: string) {
    const vehicleIndex = this.items.findIndex(item => item.chassis_id === chassis_id)

    if (vehicleIndex > -1) {
      this.items.splice(vehicleIndex, 1)
      return true
    }

    return null
  }

  async searchManyByFleetId(fleetId: string) {
    return this.items.filter(item => item.fleet_id = fleetId)
  }

  async updateColor(chassis_id: string, color: string) {
    const vehicleIndex = this.items.findIndex(item => item.chassis_id === chassis_id)

    if (vehicleIndex >= 0) {
      this.items[vehicleIndex].color = color
    }

    return this.items[vehicleIndex]
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
