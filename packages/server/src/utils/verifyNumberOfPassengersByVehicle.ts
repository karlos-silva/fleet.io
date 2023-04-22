import { BusPassengerIncorrectError } from "@/use-cases/errors/bus-passenger-incorrect-error"
import { CarPassengerIncorrectError } from "@/use-cases/errors/car-passenger-incorrect-error"
import { TruckPassengerIncorrectError } from "@/use-cases/errors/truck-passenger-incorrect-error"
import { VehicleType } from "@prisma/client"

interface IVerifyNumberOfPassengerByVehicle {
  vehicleType: VehicleType
  numberOfPassenger: number
}

export function verifyNumberOfPassengerByVehicle({
  vehicleType,
  numberOfPassenger
}: IVerifyNumberOfPassengerByVehicle) {
  if (vehicleType === 'BUS' && numberOfPassenger !== 42) {
    throw new BusPassengerIncorrectError()
  }

  if (vehicleType === 'TRUCK' && numberOfPassenger !== 1) {
    throw new TruckPassengerIncorrectError()
  }

  if (vehicleType === 'CAR' && numberOfPassenger !== 4) {
    throw new CarPassengerIncorrectError()
  }
}