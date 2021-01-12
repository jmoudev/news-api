const request = require('supertest');
const app = require('../app');
const connection = require('../connection')

afterAll(() => {
    return connection.destroy()
});

beforeEach(() => {
    return connection.seed.run()
})

describe('./api', () => {
    describe('/topics', () => {
        it('STATUS 200 - returns all topics', () => {
            return request(app)
                .get('/api/topics/')
                .expect(200).then(({ body }) => {
                    expect(body.topics).toHaveLength(3);
                    expect(body.topics[0]).toEqual(
                        expect.objectContaining({
                            description: expect.any(String),
                            slug: expect.any(String)
                        })
                    )
                })
        })
    })
})
