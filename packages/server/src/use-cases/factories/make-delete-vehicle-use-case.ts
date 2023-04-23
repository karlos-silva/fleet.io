import { PrismaVehiclesRepository } from "@/repositories/prisma/prisma-vehicles-repository"
import { DeleteVehicleUseCase } from "../delete-vehicle"


export function makeDeleteVehicleUseCase() {
  const vehiclesRepository = new PrismaVehiclesRepository()
  const useCase = new DeleteVehicleUseCase(vehiclesRepository)

  return useCase
}
