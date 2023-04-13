import { FleetsRepository } from '@/repositories/fleets-repository'
import { FleetAlreadyExistsError } from './errors/fleet-already-exists'

interface RegisterUseCaseRequest {
  name: string
}

export class CreateFleetUseCase {
  constructor(private fleetsRepository: FleetsRepository) {}

  async execute({ name }: RegisterUseCaseRequest) {
    const fleetWithSameName = await this.fleetsRepository.findByName(name)

    if (fleetWithSameName) {
      throw new FleetAlreadyExistsError()
    }

    await this.fleetsRepository.create({
      name,
    })
  }
}
