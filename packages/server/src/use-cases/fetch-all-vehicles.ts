import { Vehicle } from '@prisma/client'
import { VehiclesRepository } from '@/repositories/vehicles-repository'
import { FleetNotFoundError } from './errors/fleet-not-found-error'
import { FleetsRepository } from '@/repositories/fleets-repository'
import { FleetWithoutVehiclesError } from './errors/fleet-without-vehicles-error'

interface FetchAllVehiclesUseCaseRequest {
  fleetId: string
}

interface FetchAllVehiclesUseCaseResponse {
  vehicles: Vehicle[]
}

export class FetchAllVehiclesUseCase {
  constructor(
    private vehiclesRepository: VehiclesRepository,
    private fleetRepository: FleetsRepository
  ) { }

  async execute({ fleetId }: FetchAllVehiclesUseCaseRequest): Promise<FetchAllVehiclesUseCaseResponse> {
    const fleet = await this.fleetRepository.findById(fleetId)

    if (!fleet) {
      throw new FleetNotFoundError()
    }
    const vehicles = await this.vehiclesRepository.searchManyByFleetId(fleetId)

    return {
      vehicles
    }
  }
}
