import { Vehicle } from '@prisma/client'
import { VehiclesRepository } from '@/repositories/vehicles-repository'
interface UpdateVehicleUseCaseRequest {
  chassis_id: string
  color: string
}

interface UpdateVehicleUseCaseResponse {
  vehicle: Vehicle
}

export class UpdateVehicleUseCase {
  constructor(
    private vehiclesRepository: VehiclesRepository
  ) { }

  async execute({ color, chassis_id }: UpdateVehicleUseCaseRequest): Promise<UpdateVehicleUseCaseResponse> {

    const vehicle = await this.vehiclesRepository.updateColor(chassis_id, color)

    return {
      vehicle
    }
  }
}
