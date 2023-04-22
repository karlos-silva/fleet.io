import { Fleet, Vehicle, VehicleType } from '@prisma/client'
import { VehiclesRepository } from '@/repositories/vehicles-repository'
import { VehicleAlreadyExistsError } from './errors/vehicle-already-exists'
import { FleetsRepository } from '@/repositories/fleets-repository'
import { FleetNotFoundError } from './errors/fleet-not-found-error'
import { BusPassengerIncorrectError } from './errors/bus-passenger-incorrect-error'
import { CarPassengerIncorrectError } from './errors/car-passenger-incorrect-error'
import { verifyNumberOfPassengerByVehicle } from '@/utils/verifyNumberOfPassengersByVehicle'

interface CreateVehicleUseCaseRequest {
  type: VehicleType
  passengers: number
  color: string
  chassisSeries: string
  chassisNumber: number
  fleetId: string
}

interface CreateVehicleUseCaseResponse {
  vehicle: Vehicle
}

export class CreateVehicleUseCase {
  constructor(
    private vehiclesRepository: VehiclesRepository,
    private fleetsRepository: FleetsRepository
  ) { }

  async execute({ type, passengers, color, chassisSeries, chassisNumber, fleetId }: CreateVehicleUseCaseRequest): Promise<CreateVehicleUseCaseResponse> {
    const fleet = await this.fleetsRepository.findById(fleetId)

    if (!fleet) {
      throw new FleetNotFoundError()
    }

    const chassis_id = chassisSeries.trim() + chassisNumber
    const vehicleWithSameChassisId = await this.vehiclesRepository.findByChassisId(chassis_id)

    if (vehicleWithSameChassisId) {
      throw new VehicleAlreadyExistsError()
    }

    verifyNumberOfPassengerByVehicle({ vehicleType: type, numberOfPassenger: passengers })

    const vehicle = await this.vehiclesRepository.create({
      type,
      passengers,
      color,
      chassis_id,
      fleet_id: fleetId
    })

    return {
      vehicle
    }
  }
}
