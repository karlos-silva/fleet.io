import { PrismaFleetsRepository } from "@/repositories/prisma/prisma-fleets-repository"
import { CreateFleetUseCase } from "../create-fleet"


export function makeCreateFleetUseCase() {
  const fleetRepository = new PrismaFleetsRepository()
  const useCase = new CreateFleetUseCase(fleetRepository)

  return useCase
}
