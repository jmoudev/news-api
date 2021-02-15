const apiList = {
  'GET /api': {
    description:
      'serves up a json representation of all the available endpoints of the api'
  },
  'GET /api/topics': {
    description: 'serves an array of all topics',
    queries: null,
    exampleResponse: {
      topics: [
        {
          slug: 'coding',
          description: 'Code is love, code is life'
        }
      ]
    }
  },
  'GET /api/users/:username': {
    description: 'serves the requested user',
    queries: null,
    exampleResponse: {
      username: 'weegembump',
      avatar_url:
        'https://vignette.wikia.nocookie.net/mrmen/images/7/7e/MrMen-Bump.png/revision/latest?cb=20180123225553',
      name: 'Gemma Bump'
    }
  },
  'GET /api/articles': {
    description: 'serves an array of all articles',
    queries: ['sort_by', 'order', 'author', 'topic'],
    exampleResponse: {
      articles: [
        {
          article_id: 28,
          title: 'High Altitude Cooking',
          body:
            'Most backpacking trails vary only a few thousand feet elevation. However, many trails can be found above 10,000 feet. But what many people don’t take into consideration at these high altitudes is how these elevations affect their cooking.',
          votes: 0,
          topic: 'cooking',
          author: 'happyamy2016',
          created_at: '2018-05-27T03:32:28.514Z',
          comment_count: '5'
        }
      ]
    }
  },
  // 'POST /api/articles': {
  //   description:
  //     'creates a new article and responds with the new article object',
  //   queries: null,
  //   exampleRequestBody: {},
  //   exampleResponse: {}
  // },
  'GET /api/articles/:article_id': {
    description: 'serves the requested article',
    queries: null,
    exampleResponse: {
      article: {
        article_id: 1,
        title: 'Running a Node App',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        votes: 0,
        topic: 'coding',
        author: 'jessjelly',
        created_at: '2016-08-18T12:07:52.389Z',
        comment_count: '8'
      }
    }
  },
  'PATCH /api/articles/:article_id': {
    description:
      'updates the requested article votes with the inc_votes object returning the updated article',
    queries: null,
    exampleRequestBody: {
      inc_votes: 1
    },
    exampleResponse: {
      article_id: 1,
      title: 'Running a Node App',
      body:
        'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
      votes: 1,
      topic: 'coding',
      author: 'jessjelly',
      created_at: '2016-08-18T12:07:52.389Z',
      comment_count: '8'
    }
  },
  // 'DELETE /api/articles/:article_id': {
  //   description:
  //     'deletes the requested article and responds with an empty object',
  //   queries: null,
  //   exampleResponse: {}
  // },
  'GET /api/articles/:article_id/comments': {
    description: 'serves the requested article comments',
    queries: ['sort_by', 'order'],
    exampleResponse: {
      comments: [
        {
          comment_id: 44,
          article_id: 1,
          votes: 4,
          created_at: '2017-11-20T08:58:48.322Z',
          body:
            'Error est qui id corrupti et quod enim accusantium minus. Deleniti quae ea magni officiis et qui suscipit non.',
          author: 'grumpy19'
        }
      ]
    }
  },
  'POST /api/articles/:article_id/comments': {
    description:
      'creates a new comment for requested article and responds with the new article object',
    queries: null,
    exampleRequestBody: {
      username: 'jessjelly',
      body: 'Excellent choice'
    },
    exampleResponse: {
      comment: {
        comment_id: 19,
        article_id: 1,
        votes: 0,
        created_at: '2021-02-15T19:17:19.068Z',
        body: 'Excellent choice',
        author: 'jessjelly'
      }
    }
  },
  'PATCH /api/comment/:comment_id': {
    description:
      'updates the requested comment votes with the inc_votes object returning the updated comment object',
    queries: null,
    exampleRequestBody: {
      inc_votes: 1
    },
    exampleResponse: {
      comment: {
        comment_id: 44,
        article_id: 1,
        votes: 5,
        created_at: '2017-11-20T08:58:48.322Z',
        body:
          'Error est qui id corrupti et quod enim accusantium minus. Deleniti quae ea magni officiis et qui suscipit non.',
        author: 'grumpy19'
      }
    }
  },
  'DELETE /api/comment/:comment_id': {
    description: 'deletes the requested comment',
    queries: null,
    exampleResponse: {}
  }

  // topics: { path: '/api/topics', methods: ['get', 'post'] },
  // users: {
  //   path: '/api/users',
  //   methods: ['get', 'post']
  // },
  // user: { path: '/api/users/:username', methods: ['get'] },
  // articles: { path: '/api/articles', methods: ['get', 'post'] },
  // article: {
  //   path: '/api/articles/:article_id',
  //   methods: ['get', 'patch', 'delete']
  // },
  // article_comments: {
  //   path: '/api/articles/:article_id/comments',
  //   methods: ['get', 'post']
  // },
  // comment: {
  //   path: '/api/comments/:comment_id',
  //   methods: ['patch', 'delete']
  // }
};

module.exports = apiList;
