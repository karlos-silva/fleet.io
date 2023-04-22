export class BusPassengerIncorrectError extends Error {
  constructor() {
    super('Value of passenger is incorrect. For vehicle type BUS, number of passenger must be 42.')
  }
}
