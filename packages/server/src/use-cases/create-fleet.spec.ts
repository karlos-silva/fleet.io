import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryFleetRepository } from '@/repositories/in-memory/in-memory-fleet-repository'
import { CreateFleetUseCase } from './create-fleet'

let fleetRepository: InMemoryFleetRepository
let sut: CreateFleetUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    fleetRepository = new InMemoryFleetRepository()
    sut = new CreateFleetUseCase(fleetRepository)
  })
  it('should be able to create fleet', async () => {
    const { fleet } = await sut.execute({
      name: 'Fleet 1'
    })

    expect(fleet.id).toEqual(expect.any(String))
  })
})
