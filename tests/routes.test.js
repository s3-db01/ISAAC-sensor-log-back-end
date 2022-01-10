const request = require('supertest')
const { sequelize } = require('../models')
const app = require('../server')

describe('Post Endpoint', () => {
    it('Should create a new sensorlog', async () => {
        const res = await request(app)
        .post('/api/sensorlogs')
        .send({
            "x_coordinate": 4,
            "y_coordinate": 6,
            "humidity": 50.2,
            "temperature": 21.5,
            "up_time": 12345,
        })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('sensor_id')
        expect(res.body).toHaveProperty('humidity')
        expect(res.body).toHaveProperty('temperature')
        expect(res.body).toHaveProperty('up_time')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('createdAt')
        expect(res.body).toHaveProperty('updatedAt')
    })
})

describe('Get Endpoint', () => {
    it('Should get a sensorlogs with with id "4-6"', async () => {
        const res = await request(app)
        .get('/api/sensorlogs/4-6')
        expect(res.statusCode).toEqual(200)
    })
    it('Should get all sensorlogs', async () => {
        const res = await request(app)
        .get('/api/sensorlogs')
        expect(res.statusCode).toEqual(200)
    })
})

describe('Put Endpoints', () => {
    it('Should update a sensor with id "1"', async () => {
        const res = await request(app)
        .put('/api/sensorlogs/1')
        .send({
            "humidity": 50.2,
            "temperature": 21.5,
            "up_time": 12345,
         })
        expect(res.statusCode).toEqual(200)
    })
})

describe('Delete Endpoints', () => {
    it('Should delete all sensors', async () => {
        const res = await request(app)
        .delete('/api/sensorlogs')
        expect(res.statusCode).toEqual(200)
    })
})


afterAll(done => {
    app.close();
    done();
});
