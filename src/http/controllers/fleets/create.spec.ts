import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Create Fleet Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create fleet', async () => {
    const response = await request(app.server).post('/fleets').send({
      name: 'Fleet Test',
    })

    expect(response.statusCode).toEqual(201)
  })
})
