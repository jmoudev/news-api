const request = require('supertest');
const connection = require('../connection');
const app = require('../app');

afterAll(() => connection.destroy());

beforeEach(() => connection.seed.run());

describe('route not found', () => {
  it('ERROR - status 404 - route not found', () => {
    return request(app)
      .get('/api/topic')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not Found - path: "/api/topic"');
      });
  });
});

describe('/api', () => {
  describe('/topics', () => {
    describe('GET', () => {
      it('GET - status 200 - returns all topics', () => {
        return request(app)
          .get('/api/topics')
          .expect(200)
          .then(({ body }) => {
            expect(body.topics).toHaveLength(3);
            body.topics.forEach(topic => {
              expect(topic).toEqual(
                expect.objectContaining({
                  description: expect.any(String), // need to evaluate || null for  items without notNullable field
                  slug: expect.any(String)
                })
              );
            });
          });
      });
    });
    describe('/users', () => {
      describe('/:username', () => {
        describe('GET', () => {
          it('GET - status 200 - returns specific user', () => {
            return request(app)
              .get('/api/users/butter_bridge')
              .expect(200)
              .then(({ body }) => {
                expect(body.user).toEqual(
                  expect.objectContaining({
                    username: 'butter_bridge',
                    avatar_url: expect.any(String),
                    name: expect.any(String)
                  })
                );
              });
          });
          it('GET - ERROR status 404 - user does not exist', () => {
            return request(app)
              .get('/api/users/not_a_user')
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).toBe('Not Found - username: "not_a_user"');
              });
          });
          // it(
          //   ('GET - ERROR status 400 - bad request on username',
          //   () => {
          //     return request(app).get('/api/users/??').expect(404);
          //   })
          // );
        });
      });
    });
  });

  describe('/articles', () => {
    describe('/:article_id', () => {
      describe('GET', () => {
        it('GET - status 200 - return specific article', () => {
          return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then(({ body }) => {
              expect(body.article).toEqual(
                expect.objectContaining({
                  author: expect.any(String),
                  title: expect.any(String),
                  article_id: 1,
                  body: expect.any(String),
                  topic: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                  comment_count: 13
                })
              );
            });
        });
        it('GET - ERROR status 404 - article does not exist', () => {
          return request(app)
            .get('/api/articles/999')
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toBe('Not Found - article_id: "999"');
            });
        });
        it('GET - ERROR status 400 - bad request on article_id', () => {
          return request(app)
            .get('/api/articles/not_an_id')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe(
                'Bad Request - invalid input syntax for type integer: "not_an_id"'
              );
            });
        });
      });
      describe.only('PATCH', () => {
        it('PATCH - status 201 - return article with updated votes integer', () => {
          return request(app)
            .patch('/api/articles/1')
            .send({ inc_votes: 5 })
            .expect(201)
            .then(({ body }) => {
              expect(body.article).toEqual(
                expect.objectContaining({
                  author: expect.any(String),
                  title: expect.any(String),
                  article_id: 1,
                  body: expect.any(String),
                  topic: expect.any(String),
                  created_at: expect.any(String),
                  votes: 105,
                  comment_count: 13
                })
              );
            });
        });
        it('PATCH - ERROR status 404 - article does not exist', () => {
          return request(app)
            .patch('/api/articles/999')
            .send({ inc_votes: 5 })
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toBe('Not Found - article_id: "999"');
            });
        });
        it('PATCH - ERROR status 400 - bad request on article_id', () => {
          return request(app)
            .patch('/api/articles/not_an_id')
            .send({ inc_votes: 5 })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe(
                'Bad Request - invalid input syntax for type integer: "not_an_id"'
              );
            });
        });
        it('PATCH - ERROR status 400 - bad request body missing required fields', () => {
          return request(app)
            .patch('/api/articles/1')
            .send({})
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe(
                'Bad Request - missing required field: "inc_votes"'
              );
            });
        });
        it('PATCH - ERROR status 400 - bad request body incorrect type', () => {
          return request(app)
            .patch('/api/articles/1')
            .send({ inc_votes: 'not_an_int' })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe(
                'Bad Request - invalid input syntax for type integer: "NaN"'
              );
            });
        });
      });
    });
  });
});
