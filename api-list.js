const apiList = {
  topics: { path: '/api/topics', methods: ['get', 'post'] },
  users: {
    path: '/api/users',
    methods: ['get', 'post']
  },
  user: { path: '/api/users/:username', methods: ['get'] },
  articles: { path: '/api/articles', methods: ['get', 'post'] },
  article: {
    path: '/api/articles/:article_id',
    methods: ['get', 'patch', 'delete']
  },
  article_comments: {
    path: '/api/articles/:article_id/comments',
    methods: ['get', 'post']
  },
  comment: {
    path: '/api/comments/:comment_id',
    methods: ['patch', 'delete']
  }
};

module.exports = apiList;
