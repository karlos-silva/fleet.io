import { Vehicle } from '@prisma/client'
import { VehiclesRepository } from '@/repositories/vehicles-repository'
import { VehicleNotFoundError } from './errors/vehicle-not-found-error'

interface DeleteVehicleUseCaseRequest {
  chassisId: string
}

interface DeleteVehicleUseCaseResponse {
  chassisId: string
}

export class DeleteVehicleUseCase {
  constructor(
    private vehiclesRepository: VehiclesRepository,
  ) { }

  async execute({ chassisId }: DeleteVehicleUseCaseRequest): Promise<DeleteVehicleUseCaseResponse> {
    const vehicle = await this.vehiclesRepository.deleteByChassisId(chassisId)

    if (!vehicle) {
      throw new VehicleNotFoundError()
    }

    return {
      chassisId
    }
  }
}
