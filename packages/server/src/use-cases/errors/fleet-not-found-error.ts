export class FleetNotFoundError extends Error {
  constructor() {
    super('Fleet not found.')
  }
}
