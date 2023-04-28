export class TruckPassengerIncorrectError extends Error {
  constructor() {
    super(
      'Value of passenger is incorrect. For vehicle type TRUCK, number of passenger must be 1.',
    )
  }
}
