import { PrismaFleetsRepository } from "@/repositories/prisma/prisma-fleets-repository"
import { PrismaVehiclesRepository } from "@/repositories/prisma/prisma-vehicles-repository"
import { CreateVehicleUseCase } from "../create-vehicle"


export function makeCreateVehicleUseCase() {
  const vehiclesRepository = new PrismaVehiclesRepository()
  const fleetRepository = new PrismaFleetsRepository()
  const useCase = new CreateVehicleUseCase(vehiclesRepository, fleetRepository)

  return useCase
}
