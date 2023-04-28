import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createFleet } from '@/utils/test/create-fleet'

describe('Create Vehicle Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create vehicle', async () => {
    const fleet = await createFleet()

    const response = await request(app.server).post('/vehicles').send({
      type: 'CAR',
      passengers: 4,
      color: 'red',
      chassisSeries: 'abc',
      chassisNumber: 123,
      fleetId: fleet.id,
    })

    expect(response.statusCode).toEqual(201)
  })
})
