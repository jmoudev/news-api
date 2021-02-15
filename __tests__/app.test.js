const request = require('supertest');
const connection = require('../connection');
const app = require('../app');
const apiList = require('../api-list');

afterAll(() => connection.destroy());

beforeEach(() => connection.seed.run());

describe('/*', () => {
  it('ERROR - status 404 - route not found', () => {
    return request(app)
      .get('/api/topic')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not Found');
      });
  });
});

describe('/api', () => {
  it('ERROR - status 405 - method not allowed', () => {
    return request(app)
      .patch('/api')
      .send({})
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).toBe('Method Not Allowed');
      });
  });
  describe('GET all endpoints', () => {
    it('SUCCESS - status 200 - return endpoints object', () => {
      return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
          expect(body.endpoints).toEqual(apiList);
        });
    });
  });
});

describe('/api/topics', () => {
  it('ERROR - status 405 - method not allowed', () => {
    return request(app)
      .patch('/api/topics')
      .send({})
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).toBe('Method Not Allowed');
      });
  });
  describe('GET all topics', () => {
    it('SUCCESS - status 200 - returns all topics', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).toHaveLength(3);
          body.topics.forEach(topic => {
            expect(topic).toEqual(
              expect.objectContaining({
                description: expect.any(String),
                slug: expect.any(String)
              })
            );
          });
        });
    });
    describe('POST topic', () => {
      xit('SUCESS - status 201 - returns new comment', () => {
        return request(app)
          .post('/api/topics')
          .send({ slug: 'dogs', description: "they're coming out of the sky" })
          .expect(201)
          .then(({ body }) => {
            expect(body.comment).toEqual(
              expect.objectContaining({
                slug: '',
                description: ''
              })
            );
          });
      });
    });
  });
});

describe('/api/users', () => {
  it('ERROR - status 405 - method not allowed', () => {
    return request(app)
      .patch('/api/topics')
      .send({})
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).toBe('Method Not Allowed');
      });
  });
  xdescribe('GET all users', () => {
    it('', () => {});
  });
  xdescribe('POST user', () => {
    it('', () => {});
  });
  describe('/api/users/:username', () => {
    describe('GET user by username', () => {
      it('SUCCESS - status 200 - returns specified user', () => {
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
      it('ERROR - status 404 - user does not exist', () => {
        return request(app)
          .get('/api/users/not_a_user')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('Not Found');
          });
      });
    });
  });
});

describe('/api/articles', () => {
  it('ERROR - status 405 - method not allowed', () => {
    return request(app)
      .put('/api/articles')
      .send({})
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).toBe('Method Not Allowed');
      });
  });
  describe('GET articles', () => {
    it('SUCCESS - status 200 - return array of article objects which is sorted by default to created_at in descending order', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          body.articles.forEach(article => {
            expect(article).toEqual(
              expect.objectContaining({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(String)
              })
            );
            expect(body.articles).toBeSortedBy('created_at', {
              descending: true
            });
            expect(body.articles.length).toBe(12);
          });
        });
    });
    it('SUCCESS - status 200 - return array of article objects with sort_by and order queries on alternative column and ascending order', () => {
      return request(app)
        .get('/api/articles?sort_by=author&&order=asc')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy('author');
        });
    });
    it('SUCCESS - status 200 - return array of article objects with author query filtering column based on specified author', () => {
      return request(app)
        .get('/api/articles?author=butter_bridge')
        .expect(200)
        .then(({ body }) => {
          body.articles.forEach(article => {
            expect(article).toEqual(
              expect.objectContaining({
                author: 'butter_bridge'
              })
            );
          });
        });
    });
    it('SUCCESS - status 200 - return array of article objects with topic query filtering column based on specified topic', () => {
      return request(app)
        .get('/api/articles?topic=cats')
        .expect(200)
        .then(({ body }) => {
          body.articles.forEach(article => {
            expect(article).toEqual(
              expect.objectContaining({
                topic: 'cats'
              })
            );
          });
        });
    });
    it('SUCCESS - status 200 - author does not exist on query', () => {
      return request(app)
        .get('/api/articles?author=not_an_author')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toEqual([]);
        });
    });
    it('SUCCESS - status 200 - topic does not exist on query', () => {
      return request(app)
        .get('/api/articles?topic=not_a_topic')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toEqual([]);
        });
    });
    it('ERROR - status 400 - bad request on sort_by query', () => {
      return request(app)
        .get('/api/articles?sort_by=not_a_column')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad Request');
        });
    });
    it('ERROR - status 400 - bad request on order query', () => {
      return request(app)
        .get('/api/articles?order=not_an_order')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad Request');
        });
    });
  });
  describe('POST article', () => {
    it('', () => {});
  });
  describe('/api/articles/:article_id', () => {
    it('ERROR - status 405 - method not allowed', () => {
      return request(app)
        .put('/api/articles/1')
        .send({})
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).toBe('Method Not Allowed');
        });
    });
    describe('GET article by article_id', () => {
      it('SUCCESS - status 200 - return specified article', () => {
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
                comment_count: expect.any(String)
              })
            );
          });
      });
      it('ERROR - status 404 - article does not exist', () => {
        return request(app)
          .get('/api/articles/999')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('Not Found');
          });
      });
      it('ERROR - status 400 - bad request on article_id', () => {
        return request(app)
          .get('/api/articles/not_an_id')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Bad Request');
          });
      });
    });
    describe('PATCH article votes by article_id', () => {
      it('SUCCESS - status 200 - return specified article with updated votes integer', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: 5 })
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
                votes: 105
              })
            );
          });
      });
      it('SUCCESS - status 200 - no information in request body does not update article', () => {
        return request(app)
          .get('/api/articles/1')
          .then(({ body }) => {
            const originalArticle = body.article;

            delete originalArticle.comment_count;

            return request(app)
              .patch('/api/articles/1')
              .send({})
              .expect(200)
              .then(({ body }) => {
                expect(body.article).toEqual(originalArticle);
              });
          });
      });
      it('ERROR - status 404 - article does not exist', () => {
        return request(app)
          .patch('/api/articles/999')
          .send({ inc_votes: 5 })
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('Not Found');
          });
      });
      it('ERROR - status 400 - bad request on article_id', () => {
        return request(app)
          .patch('/api/articles/not_an_id')
          .send({ inc_votes: 5 })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Bad Request');
          });
      });

      it('ERROR - status 400 - bad request body incorrect type', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: 'not_an_int' })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Bad Request');
          });
      });
    });
    describe('/api/articles/:article_id/comments', () => {
      it('ERROR - status 405 - method not allowed', () => {
        return request(app)
          .patch('/api/articles/1/comments')
          .send({})
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).toBe('Method Not Allowed');
          });
      });
      describe('GET comments by article_id', () => {
        it('SUCCESS - status 200 - returns array of comments for specified article sorted by default on created_at column descending order', () => {
          return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then(({ body }) => {
              body.comments.forEach(comment => {
                expect(comment).toEqual(
                  expect.objectContaining({
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    article_id: 1
                  })
                );
                expect(body.comments).toBeSortedBy('created_at', {
                  descending: true
                });
              });
            });
        });
        it('SUCCESS - status 200 - returns array of comments with sort_by query on alternative column in default descending order', () => {
          return request(app)
            .get('/api/articles/1/comments?sort_by=votes')
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).toBeSortedBy('votes', {
                descending: true
              });
            });
        });
        it('SUCCESS - status 200 - returns array of comments with sort_by and order queries on alternative column and in ascending order', () => {
          return request(app)
            .get('/api/articles/1/comments?sort_by=votes&&order=asc')
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).toBeSortedBy('votes');
            });
        });
        it('SUCCESS - status 200 - returns empty array when no existing comments per article', () => {
          return request(app)
            .get('/api/articles/7/comments')
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).toEqual([]);
            });
        });
        it('ERROR - status 404 - article does not exist', () => {
          return request(app)
            .get('/api/articles/999/comments')
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toBe('Not Found');
            });
        });
        it('ERROR - status 400 - bad request on article_id', () => {
          return request(app)
            .get('/api/articles/not_an_id/comments')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe('Bad Request');
            });
        });
        it('ERROR - status 400 - bad request on sort_by query', () => {
          return request(app)
            .get('/api/articles/1/comments?sort_by=not_a_column')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe('Bad Request');
            });
        });
        it('ERROR - status 400 - bad request on order query', () => {
          return request(app)
            .get('/api/articles/1/comments?order=not_an_order')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe('Bad Request');
            });
        });
      });
      describe('POST comment by article_id', () => {
        it('SUCCESS - status 201 - returns new comment', () => {
          return request(app)
            .post('/api/articles/1/comments')
            .send({ username: 'butter_bridge', body: 'So true...' })
            .expect(201)
            .then(({ body }) => {
              expect(body.comment).toEqual(
                expect.objectContaining({
                  comment_id: expect.any(Number),
                  author: 'butter_bridge',
                  body: 'So true...',
                  votes: expect.any(Number),
                  created_at: expect.any(String)
                })
              );
            });
        });
        it('ERROR - status 404 - article does not exist', () => {
          return request(app)
            .post('/api/articles/999/comments')
            .send({ username: 'butter_bridge', body: 'So true...' })
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toBe('Not Found');
            });
        });
        it('ERROR - status 400 - bad request on article_id', () => {
          return request(app)
            .post('/api/articles/not_an_id/comments')
            .send({ username: 'butter_bridge', body: 'So true...' })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe('Bad Request');
            });
        });
        it('ERROR - status 400 - bad request body missing required field username', () => {
          return request(app)
            .post('/api/articles/1/comments')
            .send({ body: 'So true...' })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe('Bad Request');
            });
        });
        it('ERROR - status 400 - bad request body missing required field body', () => {
          return request(app)
            .post('/api/articles/1/comments')
            .send({ username: 'butter_bridge' })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe('Bad Request');
            });
        });
        it('ERROR - status 400 - bad request body missing both required fields', () => {
          return request(app)
            .post('/api/articles/1/comments')
            .send({})
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe('Bad Request');
            });
        });
        it('ERROR - status 400 - bad request username not valid', () => {
          return request(app)
            .post('/api/articles/1/comments')
            .send({ username: 'not_a_user', body: 'So true...' })
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toBe('Not Found');
            });
        });
      });
    });
  });
});

describe('/api/comments', () => {
  describe('/api/comments/:comment_id', () => {
    it('ERROR - status 405 - method not allowed', () => {
      return request(app)
        .put('/api/comments/1')
        .send({})
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).toBe('Method Not Allowed');
        });
    });
    describe('PATCH comment votes by comment_id', () => {
      it('SUCCESS - status 200 - return updated comment with incremented votes integer', () => {
        return request(app)
          .patch('/api/comments/1')
          .expect(200)
          .send({ inc_votes: 5 })
          .then(({ body }) => {
            expect(body.comment).toEqual(
              expect.objectContaining({
                comment_id: 1,
                username: expect.any(String),
                article_id: expect.any(Number),
                votes: 21,
                created_at: expect.any(String),
                body: expect.any(String)
              })
            );
          });
      });
      it('SUCCESS - status 200 - return comment when empty body provided', () => {
        return request(app)
          .patch('/api/comments/1')
          .expect(200)
          .send({})
          .then(({ body }) => {
            expect(body.comment).toEqual(
              expect.objectContaining({
                comment_id: 1,
                username: expect.any(String),
                article_id: expect.any(Number),
                votes: 16,
                created_at: expect.any(String),
                body: expect.any(String)
              })
            );
          });
      });
      it('ERROR - ERROR status 404 - comment does not exist', () => {
        return request(app)
          .patch('/api/comments/999')
          .expect(404)
          .send({ inc_votes: 5 })
          .then(({ body }) => {
            expect(body.msg).toBe('Not Found');
          });
      });
      it('ERROR - ERROR status 400 - bad request on comment_id', () => {
        return request(app)
          .patch('/api/comments/not_an_id')
          .expect(400)
          .send({ inc_votes: 5 })
          .then(({ body }) => {
            expect(body.msg).toBe('Bad Request');
          });
      });
      it('ERROR - ERROR status 400 - bad request on inc_votes', () => {
        return request(app)
          .patch('/api/comments/1')
          .expect(400)
          .send({ inc_votes: 'not_a_number' })
          .then(({ body }) => {
            expect(body.msg).toBe('Bad Request');
          });
      });
    });
    describe('DELETE comment by comment_id', () => {
      it('SUCCESS - status 204 - ensure deleted content', () => {
        return request(app)
          .delete('/api/comments/1')
          .expect(204)
          .then(({ body }) => {
            expect(body).toEqual({});
          });
      });
      it('SUCCESS - status 204 - comment does not exist', () => {
        return request(app)
          .delete('/api/comments/999')
          .expect(204)
          .then(({ body }) => {
            expect(body).toEqual({});
          });
      });
      it('ERROR - ERROR status 400 - bad request on comment_id', () => {
        return request(app)
          .delete('/api/comments/not_an_id')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Bad Request');
          });
      });
    });
  });
});
