import { PrismaVehiclesRepository } from "@/repositories/prisma/prisma-vehicles-repository"
import { GetVehicleUseCase } from "../get-vehicle"


export function makeGetVehicleUseCase() {
  const vehiclesRepository = new PrismaVehiclesRepository()
  const useCase = new GetVehicleUseCase(vehiclesRepository)

  return useCase
}
