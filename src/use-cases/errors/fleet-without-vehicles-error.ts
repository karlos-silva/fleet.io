export class FleetWithoutVehiclesError extends Error {
  constructor() {
    super('This fleet has no vehicles.')
  }
}
