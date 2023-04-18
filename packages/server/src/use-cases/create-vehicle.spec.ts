import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryVehiclesRepository } from '@/repositories/in-memory/in-memory-vehicles-repository'
import { CreateVehicleUseCase } from './create-vehicle'
import { InMemoryFleetsRepository } from '@/repositories/in-memory/in-memory-fleets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { VehicleAlreadyExistsError } from './errors/vehicle-already-exists'

let vehiclesRepository: InMemoryVehiclesRepository
let fleetsRepository: InMemoryFleetsRepository
let sut: CreateVehicleUseCase

describe('Fleet Use Case', () => {
  beforeEach(() => {
    vehiclesRepository = new InMemoryVehiclesRepository()
    fleetsRepository = new InMemoryFleetsRepository()
    sut = new CreateVehicleUseCase(vehiclesRepository, fleetsRepository)
  })

  it('should be able to create vehicle', async () => {
    const fleet = await fleetsRepository.create({
      name: 'Fleet 1',
    })
    const { vehicle } = await sut.execute({
      type: 'BUS',
      passengers: 42,
      color: 'blue',
      chassisSeries: 'abc',
      chassisNumber: 123,
      fleetId: fleet.id
    })

    expect(vehicle.id).toEqual(expect.any(String))
  })

  it('should not be able to create vehicle with same chassis id twice', async () => {
    const fleet = await fleetsRepository.create({
      name: 'Fleet 1',
    })
    const { vehicle } = await sut.execute({
      type: 'BUS',
      passengers: 42,
      color: 'blue',
      chassisSeries: 'abc',
      chassisNumber: 123,
      fleetId: fleet.id
    })

    await expect(() =>
      sut.execute({
        type: 'BUS',
        passengers: 42,
        color: 'blue',
        chassisSeries: 'abc',
        chassisNumber: 123,
        fleetId: fleet.id
      })
    ).rejects.toBeInstanceOf(VehicleAlreadyExistsError)
  })

  it('should be able to create vehicle when fleetId does not exists', async () => {

    await expect(() =>
      sut.execute({
        type: 'BUS',
        passengers: 42,
        color: 'blue',
        chassisSeries: 'abc',
        chassisNumber: 123,
        fleetId: 'id'
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })


})
