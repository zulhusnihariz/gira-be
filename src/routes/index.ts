const router = [
  {
    BaseURL: '/users',
    Router: require('./user.router'),
  },
  {
    BaseURL: '/projects',
    Router: require('./project.router'),
  },
  {
    BaseURL: '/tickets',
    Router: require('./ticket.router'),
  },
  {
    BaseURL: '/comments',
    Router: require('./comment.router'),
  },
]

module.exports = router
