const router = [
  {
    BaseURL: '/users',
    Router: require('./user.router'),
  },
  {
    BaseURL: '/projects',
    Router: require('./project.router'),
  },
]

module.exports = router
