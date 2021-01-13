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
        expect(body.msg).toBe('Not Found: /api/topic');
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
        describe.only('GET', () => {
          it('GET - status 200 - returns specific user', () => {
            return request(app)
              .get('/api/users/1')
              .expect(200)
              .then(({ body }) => {
                expect(body.user).toEqual();
              });
          });
        });
      });
    });
  });

  let testPatchArticle;

  beforeEach(() => {
    testPatchArticle = {
      article_id: 1,
      title: 'Living in the shadow of a great man',
      body: 'I find this existence challenging',
      votes: 105,
      topic: 'mitch',
      author: 'butter_bridge',
      created_at: new Date(1542284514171)
    };
  });

  describe('/articles', () => {
    it('PATCH - status 201 - return updated article when patch positive integer', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({ inc_votes: 5 })
        .expect(201)
        .then(({ body }) => {
          expect(body.article).toEqual(testPatchArticle);
        });
    });
  });
});
