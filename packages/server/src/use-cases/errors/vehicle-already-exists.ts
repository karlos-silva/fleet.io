export class VehicleAlreadyExistsError extends Error {
  constructor() {
    super('Vehicle name already exists.')
  }
}
