export class CarPassengerIncorrectError extends Error {
  constructor() {
    super('Value of passenger is incorrect. For vehicle type CAR, number of passenger must be 4.')
  }
}
