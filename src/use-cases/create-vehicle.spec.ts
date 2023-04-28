import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryVehiclesRepository } from '@/repositories/in-memory/in-memory-vehicles-repository'
import { CreateVehicleUseCase } from './create-vehicle'
import { InMemoryFleetsRepository } from '@/repositories/in-memory/in-memory-fleets-repository'
import { VehicleAlreadyExistsError } from './errors/vehicle-already-exists'
import { FleetNotFoundError } from './errors/fleet-not-found-error'
import { CarPassengerIncorrectError } from './errors/car-passenger-incorrect-error'
import { TruckPassengerIncorrectError } from './errors/truck-passenger-incorrect-error'
import { BusPassengerIncorrectError } from './errors/bus-passenger-incorrect-error'

let vehiclesRepository: InMemoryVehiclesRepository
let fleetsRepository: InMemoryFleetsRepository
let sut: CreateVehicleUseCase

describe('Create Vehicle Use Case', () => {
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
      fleetId: fleet.id,
    })

    expect(vehicle.id).toEqual(expect.any(String))
  })

  it('should not be able to create vehicle with same chassis id twice', async () => {
    const fleet = await fleetsRepository.create({
      name: 'Fleet 1',
    })
    await sut.execute({
      type: 'BUS',
      passengers: 42,
      color: 'blue',
      chassisSeries: 'abc',
      chassisNumber: 123,
      fleetId: fleet.id,
    })

    await expect(() =>
      sut.execute({
        type: 'BUS',
        passengers: 42,
        color: 'blue',
        chassisSeries: 'abc',
        chassisNumber: 123,
        fleetId: fleet.id,
      }),
    ).rejects.toBeInstanceOf(VehicleAlreadyExistsError)
  })

  it('should not be able to create vehicle when fleetId does not exists', async () => {
    await expect(() =>
      sut.execute({
        type: 'BUS',
        passengers: 42,
        color: 'blue',
        chassisSeries: 'abc',
        chassisNumber: 123,
        fleetId: 'id',
      }),
    ).rejects.toBeInstanceOf(FleetNotFoundError)
  })

  it('should be able to create vehicle type BUS', async () => {
    const fleet = await fleetsRepository.create({
      name: 'Fleet 1',
    })

    const { vehicle } = await sut.execute({
      type: 'BUS',
      passengers: 42,
      color: 'blue',
      chassisSeries: 'abc',
      chassisNumber: 123,
      fleetId: fleet.id,
    })

    expect(vehicle.id).toEqual(expect.any(String))
  })

  it('should be able to create vehicle type CAR', async () => {
    const fleet = await fleetsRepository.create({
      name: 'Fleet 1',
    })

    const { vehicle } = await sut.execute({
      type: 'CAR',
      passengers: 4,
      color: 'blue',
      chassisSeries: 'abc',
      chassisNumber: 123,
      fleetId: fleet.id,
    })

    expect(vehicle.id).toEqual(expect.any(String))
  })

  it('should be able to create vehicle type TRUCK', async () => {
    const fleet = await fleetsRepository.create({
      name: 'Fleet 1',
    })

    const { vehicle } = await sut.execute({
      type: 'TRUCK',
      passengers: 1,
      color: 'blue',
      chassisSeries: 'abc',
      chassisNumber: 123,
      fleetId: fleet.id,
    })

    expect(vehicle.id).toEqual(expect.any(String))
  })

  it('should not be able to create vehicle type CAR when number of passenger is incorrect ', async () => {
    const fleet = await fleetsRepository.create({
      name: 'Fleet 1',
    })
    await expect(() =>
      sut.execute({
        type: 'CAR',
        passengers: 5,
        color: 'blue',
        chassisSeries: 'abc',
        chassisNumber: 123,
        fleetId: fleet.id,
      }),
    ).rejects.toBeInstanceOf(CarPassengerIncorrectError)
  })

  it('should not be able to create vehicle type TRUCK when number of passenger is incorrect ', async () => {
    const fleet = await fleetsRepository.create({
      name: 'Fleet 1',
    })
    await expect(() =>
      sut.execute({
        type: 'TRUCK',
        passengers: 5,
        color: 'blue',
        chassisSeries: 'abc',
        chassisNumber: 123,
        fleetId: fleet.id,
      }),
    ).rejects.toBeInstanceOf(TruckPassengerIncorrectError)
  })

  it('should not be able to create vehicle type BUS when number of passenger is incorrect ', async () => {
    const fleet = await fleetsRepository.create({
      name: 'Fleet 1',
    })
    await expect(() =>
      sut.execute({
        type: 'BUS',
        passengers: 5,
        color: 'blue',
        chassisSeries: 'abc',
        chassisNumber: 123,
        fleetId: fleet.id,
      }),
    ).rejects.toBeInstanceOf(BusPassengerIncorrectError)
  })
})
