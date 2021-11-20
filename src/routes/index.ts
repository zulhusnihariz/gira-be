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
]

module.exports = router
