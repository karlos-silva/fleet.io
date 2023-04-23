import { PrismaVehiclesRepository } from "@/repositories/prisma/prisma-vehicles-repository"
import { FetchAllVehiclesUseCase } from "../fetch-all-vehicles"
import { PrismaFleetsRepository } from "@/repositories/prisma/prisma-fleets-repository"


export function makeFetchAllVehiclesUseCase() {
  const vehiclesRepository = new PrismaVehiclesRepository()
  const fleetRepository = new PrismaFleetsRepository()
  const useCase = new FetchAllVehiclesUseCase(vehiclesRepository, fleetRepository)

  return useCase
}
