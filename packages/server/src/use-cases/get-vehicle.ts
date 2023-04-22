import { Vehicle } from '@prisma/client'
import { VehiclesRepository } from '@/repositories/vehicles-repository'
import { VehicleNotFoundError } from './errors/vehicle-not-found-error'

interface GetVehicleUseCaseRequest {
  chassisId: string
}

interface GetVehicleUseCaseResponse {
  vehicle: Vehicle
}

export class GetVehicleUseCase {
  constructor(
    private vehiclesRepository: VehiclesRepository,
  ) { }

  async execute({ chassisId }: GetVehicleUseCaseRequest): Promise<GetVehicleUseCaseResponse> {
    const vehicle = await this.vehiclesRepository.findByChassisId(chassisId)

    if (!vehicle) {
      throw new VehicleNotFoundError()
    }

    return {
      vehicle
    }
  }
}
