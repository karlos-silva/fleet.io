import { PrismaVehiclesRepository } from "@/repositories/prisma/prisma-vehicles-repository"
import { UpdateVehicleUseCase } from "../update-vehicle"


export function makeUpdateVehicleUseCase() {
  const vehiclesRepository = new PrismaVehiclesRepository()
  const useCase = new UpdateVehicleUseCase(vehiclesRepository)

  return useCase
}
