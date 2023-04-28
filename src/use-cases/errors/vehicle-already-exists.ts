export class VehicleAlreadyExistsError extends Error {
  constructor() {
    super('Vehicle already exists.')
  }
}
