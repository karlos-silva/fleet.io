import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryVehiclesRepository } from '@/repositories/in-memory/in-memory-vehicles-repository'
import { GetVehicleUseCase } from './get-vehicle'
import { VehicleNotFoundError } from './errors/vehicle-not-found-error'

let vehiclesRepository: InMemoryVehiclesRepository
let sut: GetVehicleUseCase

describe('Fleet Use Case', () => {
  beforeEach(() => {
    vehiclesRepository = new InMemoryVehiclesRepository()
    sut = new GetVehicleUseCase(vehiclesRepository)

    vehiclesRepository.create({
      type: 'BUS',
      passengers: 42,
      color: 'blue',
      chassis_id: 'abc123',
      fleet_id: '1'
    })
  })

  it('should be able to get vehicle', async () => {
    const { vehicle } = await sut.execute({
      chassisId: 'abc123'
    })

    expect(vehicle.id).toEqual(expect.any(String))
  })

  it('should not be able to get vehicle with incorrect chassis_id', async () => {

    await expect(() =>
      sut.execute({
        chassisId: 'incorrect-chassis-id'
      }),
    ).rejects.toBeInstanceOf(VehicleNotFoundError)
  })

})
