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
          it('GET - status 200 - returns specified user', () => {
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
        it('GET - status 200 - return specified article', () => {
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
              expect(body.msg).toBe('Not Found');
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
      describe('PATCH', () => {
        it('PATCH - status 201 - return specified article with updated votes integer', () => {
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
                  votes: 105
                  // comment_count: 13 COMMENT_COUNT NOT TO BE INCLUDED IN UPDATEARTICLE
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
      describe('/comments', () => {
        describe('POST', () => {
          it('POST - status 201 - return posted comment', () => {
            return request(app)
              .post('/api/articles/1/comments')
              .send({ username: 'butter_bridge', body: 'So true...' })
              .expect(201)
              .then(({ body }) => {
                expect(body.comment).toEqual(
                  expect.objectContaining({
                    comment_id: expect.any(Number),
                    username: 'butter_bridge',
                    article_id: 1,
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    body: 'So true...'
                  })
                );
              });
          });
          // probably better to keep errors simple i.e. Bad Request
          it('POST - ERROR status 404 - article does not exist', () => {
            return request(app)
              .post('/api/articles/999/comments')
              .send({ username: 'butter_bridge', body: 'So true...' })
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).toBe('Not Found');
              });
          });
          it('POST - ERROR status 400 - bad request on article_id', () => {
            return request(app)
              .post('/api/articles/not_an_id/comments')
              .send({ username: 'butter_bridge', body: 'So true...' })
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).toBe(
                  'Bad Request - invalid input syntax for type integer: "not_an_id"'
                );
              });
          });
          it('POST - ERROR status 400 - bad request body missing required field username', () => {
            return request(app)
              .post('/api/articles/1/comments')
              .send({ body: 'So true...' })
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).toBe(
                  'Bad Request - body missing required field: "username"'
                );
              });
          });
          it('POST - ERROR status 400 - bad request body missing required field body', () => {
            return request(app)
              .post('/api/articles/1/comments')
              .send({ username: 'butter_bridge' })
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).toBe(
                  'Bad Request - body missing required field: "body"'
                );
              });
          });
          it('POST - ERROR status 400 - bad request body missing both required fields', () => {
            return request(app)
              .post('/api/articles/1/comments')
              .send({})
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).toBe(
                  'Bad Request - body missing required fields: "username" and "body"'
                );
              });
          });
          it('POST - ERROR status 400 - bad request username not valid', () => {
            return request(app)
              .post('/api/articles/1/comments')
              .send({ username: 'not_a_user', body: 'So true...' })
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).toBe('Not Found');
              });
          });
        });
        describe('GET', () => {
          it('GET - status 200 - returns array of comments for specified article sorted by default on created_at column descending order', () => {
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
          it('GET - status 200 - returns array of comments with sort_by query on alternative column in default descending order', () => {
            return request(app)
              .get('/api/articles/1/comments?sort_by=votes')
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).toBeSortedBy('votes', {
                  descending: true
                });
              });
          });
          it('GET - status 200 - returns array of comments with sort_by and order queries on alternative column and in ascending order', () => {
            return request(app)
              .get('/api/articles/1/comments?sort_by=votes&&order=asc')
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).toBeSortedBy('votes');
              });
          });
          it('GET - status 200 - returns empty array when no existing comments per article', () => {
            return request(app)
              .get('/api/articles/7/comments')
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).toEqual([]);
              });
          });
          it('GET - ERROR status 404 - article does not exist', () => {
            return request(app)
              .get('/api/articles/999/comments')
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).toBe('Not Found');
              });
          });
          it('GET - ERROR status 400 - bad request on article_id', () => {
            return request(app)
              .get('/api/articles/not_an_id/comments')
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).toBe(
                  'Bad Request - invalid input syntax for type integer: "not_an_id"'
                );
              });
          });
          it('GET - ERROR status 400 - bad request on sort_by query', () => {
            return request(app)
              .get('/api/articles/1/comments?sort_by=not_a_column')
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).toBe('Bad Request');
              });
          });
          it('GET - ERROR status 400 - bad request on order query', () => {
            return request(app)
              .get('/api/articles/1/comments?order=not_an_order')
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).toBe('Bad Request');
              });
          });
        });
      });
    });
    describe('GET', () => {
      it('GET - status 200 - return array of article objects which is sorted by default to created_at in descending order', () => {
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
                  comment_count: expect.any(Number)
                })
              );
              expect(body.articles).toBeSortedBy('created_at', {
                descending: true
              });
              expect(body.articles.length).toBe(12);
            });
          });
      });
      it('GET - status 200 - return array of article objects with sort_by and order queries on alternative column and ascending order', () => {
        return request(app)
          .get('/api/articles?sort_by=author&&order=asc')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).toBeSortedBy('author');
          });
      });
      it('GET - status 200 - return array of article objects with author query filtering column based on specified author', () => {
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
      it('GET - status 200 - return array of article objects with author query filtering column based on specified author', () => {
        return request(app)
          .get('/api/articles?topic=cats')
          .expect(200)
          .then(({ body }) => {
            console.log(body);
            body.articles.forEach(article => {
              expect(article).toEqual(
                expect.objectContaining({
                  topic: 'cats'
                })
              );
            });
          });
      });
      it('GET - ERROR status 400 - bad request on sort_by query', () => {
        return request(app)
          .get('/api/articles?sort_by=not_a_column')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Bad Request');
          });
      });
      it('GET - ERROR status 400 - bad request on order query', () => {
        return request(app)
          .get('/api/articles?order=not_an_order')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Bad Request');
          });
      });
      it('GET - ERROR status 404 - author does not exist', () => {
        return request(app)
          .get('/api/articles?author=not_an_author')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('Not Found');
          });
      });
      it('GET - ERROR status 404 - topic does not exist', () => {
        return request(app)
          .get('/api/articles?topic=not_a_topic')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('Not Found');
          });
      });
    });
  });
  describe('/comments', () => {
    describe('/:comment_id', () => {
      describe('PATCH', () => {
        it('PATCH - status 200 - return updated comment with incremented votes integer', () => {
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
        it('PATCH - status 200 - return comment when empty body provided', () => {
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
        it('PATCH - ERROR status 404 - comment does not exist', () => {
          return request(app)
            .patch('/api/comments/999')
            .expect(404)
            .send({ inc_votes: 5 })
            .then(({ body }) => {
              expect(body.msg).toBe('Not Found');
            });
        });
        it('PATCH - ERROR status 400 - bad request on comment_id', () => {
          return request(app)
            .patch('/api/comments/not_an_id')
            .expect(400)
            .send({ inc_votes: 5 })
            .then(({ body }) => {
              expect(body.msg).toBe(
                'Bad Request - invalid input syntax for type integer: "not_an_id"'
              );
            });
        });
      });
      describe('DELETE', () => {
        it.only('DELETE - status 204 - ensure deleted content', () => {
          return request(app)
            .delete('/api/comments/1')
            .expect(204)
            .then(() => {
              return request(app).get('/api/comments/1').expect(404);
            })
            .then(({ body }) => {
              expect(body.msg).toBe('Not Found');
            });
        });
      });
    });
  });
});
