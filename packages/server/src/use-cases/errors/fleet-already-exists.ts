export class FleetAlreadyExistsError extends Error {
  constructor() {
    super('Fleet name already exists.')
  }
}
