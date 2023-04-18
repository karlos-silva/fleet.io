import { Prisma, Vehicle } from '@prisma/client'

export interface VehiclesRepository {
  findByChassisId(chassis_id: string): Promise<Vehicle | null>
  create(data: Prisma.VehicleUncheckedCreateInput): Promise<Vehicle>
}
