import { Prisma, Vehicle } from '@prisma/client'

export interface VehiclesRepository {
  findByChassisId(chassis_id: string): Promise<Vehicle | null>
  create(data: Prisma.VehicleUncheckedCreateInput): Promise<Vehicle>
  deleteByChassisId(chassis_id: string): Promise<boolean | string>
  searchManyByFleetId(fleetId: string): Promise<Vehicle[]>
  updateColor(chassis_id: string, color: string): Promise<Vehicle>
}
