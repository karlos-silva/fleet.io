import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryFleetsRepository } from '@/repositories/in-memory/in-memory-fleets-repository'
import { CreateFleetUseCase } from './create-fleet'
import { FleetAlreadyExistsError } from './errors/fleet-already-exists-error'

let fleetRepository: InMemoryFleetsRepository
let sut: CreateFleetUseCase

describe('Fleet Use Case', () => {
  beforeEach(() => {
    fleetRepository = new InMemoryFleetsRepository()
    sut = new CreateFleetUseCase(fleetRepository)
  })

  it('should be able to create fleet', async () => {
    const { fleet } = await sut.execute({
      name: 'Fleet 1'
    })

    expect(fleet.id).toEqual(expect.any(String))
  })

  it('should not be able to create fleet with same name twice', async () => {
    const name = 'Fleet 1'
    await sut.execute({
      name
    })

    await expect(() =>
      sut.execute({
        name
      }),
    ).rejects.toBeInstanceOf(FleetAlreadyExistsError)
  })

})
