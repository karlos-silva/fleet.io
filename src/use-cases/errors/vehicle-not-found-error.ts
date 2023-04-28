export class VehicleNotFoundError extends Error {
  constructor() {
    super('Vehicle not found.')
  }
}
