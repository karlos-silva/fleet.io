import { Prisma } from "@prisma/client";
import { VehiclesRepository } from "../vehicles-repository";
import { prisma } from "@/lib/prisma";

export class PrismaVehiclesRepository implements VehiclesRepository {
  async findByChassisId(chassis_id: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        chassis_id: chassis_id
      }
    })

    return vehicle
  }

  async deleteByChassisId(chassis_id: string) {
    const vehicle = prisma.vehicle.findUnique({
      where: { chassis_id }
    })

    if (!vehicle) {
      return false
    }

    prisma.vehicle.delete({
      where: {
        chassis_id: chassis_id
      }
    })

    return chassis_id
  }

  async searchManyByFleetId(fleetId: string) {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        fleet_id: fleetId
      }
    })

    return vehicles
  }

  async updateColor(chassis_id: string, color: string) {
    const vehicle = await prisma.vehicle.update({
      where: {
        chassis_id,
      },
      data: {
        color: color
      }
    })

    return vehicle
  }

  async create(data: Prisma.VehicleUncheckedCreateInput) {
    const vehicle = await prisma.vehicle.create({
      data: data
    })

    return vehicle
  }

}