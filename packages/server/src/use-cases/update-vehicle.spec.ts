import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryVehiclesRepository } from '@/repositories/in-memory/in-memory-vehicles-repository'
import { UpdateVehicleUseCase } from './update-vehicle'

let vehiclesRepository: InMemoryVehiclesRepository
let sut: UpdateVehicleUseCase

describe('Update Vehicle Use Case', () => {
  beforeEach(() => {
    vehiclesRepository = new InMemoryVehiclesRepository()
    sut = new UpdateVehicleUseCase(vehiclesRepository)

    vehiclesRepository.create({
      type: 'BUS',
      passengers: 42,
      color: 'blue',
      chassis_id: 'abc123',
      fleet_id: '1'
    })
  })

  it('should be able to get vehicle', async () => {
    await vehiclesRepository.create({
      type: 'BUS',
      passengers: 42,
      color: 'blue',
      chassis_id: 'abc123',
      fleet_id: '1'
    })

    const { vehicle } = await sut.execute({
      chassisId: 'abc123',
      color: 'red'
    })

    expect(vehicle.color).toEqual('red')
  })
})
