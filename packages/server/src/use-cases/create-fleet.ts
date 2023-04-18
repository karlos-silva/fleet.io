import { FleetsRepository } from '@/repositories/fleets-repository'
import { FleetAlreadyExistsError } from './errors/fleet-already-exists'
import { Fleet } from '@prisma/client'

interface CreateFleetUseCaseRequest {
  name: string
}

interface CreateFleetUseCaseResponse {
  fleet: Fleet
}

export class CreateFleetUseCase {
  constructor(private fleetsRepository: FleetsRepository) { }

  async execute({ name }: CreateFleetUseCaseRequest): Promise<CreateFleetUseCaseResponse> {
    const formattedName = name.trim()
    const fleetWithSameName = await this.fleetsRepository.findByName(formattedName)

    if (fleetWithSameName) {
      throw new FleetAlreadyExistsError()
    }

    const fleet = await this.fleetsRepository.create({
      name: formattedName,
    })

    return {
      fleet
    }
  }
}
