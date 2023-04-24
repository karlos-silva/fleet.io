import { Vehicle } from '@prisma/client'
import { VehiclesRepository } from '@/repositories/vehicles-repository'
import { VehicleNotFoundError } from './errors/vehicle-not-found-error'

interface DeleteVehicleUseCaseRequest {
  chassisId: string
}

interface DeleteVehicleUseCaseResponse {
  vehicle: Vehicle
}

export class DeleteVehicleUseCase {
  constructor(
    private vehiclesRepository: VehiclesRepository,
  ) { }

  async execute({ chassisId }: DeleteVehicleUseCaseRequest): Promise<DeleteVehicleUseCaseResponse> {
    const findVehicle = await this.vehiclesRepository.findByChassisId(chassisId)

    if (!findVehicle) {
      throw new VehicleNotFoundError()
    }

    const vehicle = await this.vehiclesRepository.deleteByChassisId(chassisId)

    return {
      vehicle
    }
  }
}