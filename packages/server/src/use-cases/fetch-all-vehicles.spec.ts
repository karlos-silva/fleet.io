import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryVehiclesRepository } from '@/repositories/in-memory/in-memory-vehicles-repository'
import { InMemoryFleetsRepository } from '@/repositories/in-memory/in-memory-fleets-repository'
import { FetchAllVehiclesUseCase } from './fetch-all-vehicles'
import { FleetNotFoundError } from './errors/fleet-not-found-error'

let vehiclesRepository: InMemoryVehiclesRepository
let fleetsRepository: InMemoryFleetsRepository
let sut: FetchAllVehiclesUseCase

describe('Fetch All Vehicles Use Case', () => {
  beforeEach(() => {
    vehiclesRepository = new InMemoryVehiclesRepository()
    fleetsRepository = new InMemoryFleetsRepository()
    sut = new FetchAllVehiclesUseCase(vehiclesRepository, fleetsRepository)
  })

  it('should be able to fetch all vehicles', async () => {
    const fleet = await fleetsRepository.create({
      name: 'Fleet 1',
    })
    await vehiclesRepository.create({
      type: 'BUS',
      passengers: 42,
      color: 'blue',
      chassis_id: 'abc123',
      fleet_id: fleet.id
    })
    await vehiclesRepository.create({
      type: 'CAR',
      passengers: 4,
      color: 'blue',
      chassis_id: 'abc123',
      fleet_id: fleet.id
    })

    const { vehicles } = await sut.execute({ fleetId: fleet.id })

    expect(vehicles).toHaveLength(2)
    expect(vehicles).toEqual([
      expect.objectContaining({
        type: 'BUS',
        passengers: 42,
        color: 'blue',
        chassis_id: 'abc123',
        fleet_id: fleet.id
      }),
      expect.objectContaining({
        type: 'CAR',
        passengers: 4,
        color: 'blue',
        chassis_id: 'abc123',
        fleet_id: fleet.id
      }),
    ])
  })

  it('should not be able to fetch all vehicles with inexistent fleet id', async () => {
    await expect(() => sut.execute({ fleetId: 'inexistent-fleet-id' })).rejects.toBeInstanceOf(FleetNotFoundError)
  })

  it('should not be able to fetch all vehicles with inexistent fleet id', async () => {
    await expect(() => sut.execute({ fleetId: 'inexistent-fleet-id' })).rejects.toBeInstanceOf(FleetNotFoundError)
  })

})
