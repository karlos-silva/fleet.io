import { Vehicle } from '@prisma/client'
import { VehiclesRepository } from '@/repositories/vehicles-repository'
interface UpdateVehicleUseCaseRequest {
  chassisId: string
  color: string
}

interface UpdateVehicleUseCaseResponse {
  vehicle: Vehicle
}

export class UpdateVehicleUseCase {
  constructor(
    private vehiclesRepository: VehiclesRepository
  ) { }

  async execute({ color, chassisId }: UpdateVehicleUseCaseRequest): Promise<UpdateVehicleUseCaseResponse> {

    const vehicle = await this.vehiclesRepository.updateColor(chassisId, color)

    return {
      vehicle
    }
  }
}
