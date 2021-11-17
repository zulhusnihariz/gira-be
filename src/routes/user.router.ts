const express = require('express')
const Router = express.Router()
import { UserController } from '../controllers'

class User extends UserController {
  constructor() {
    super()
    Router.get('/', this.GetAllUsers)
    Router.get('/:id', this.GetUserById)
    Router.post('/', this.PostUser)
    Router.delete('/:id', this.DeleteUser)
    Router.patch('/:id', this.UpdateUser)
  }
}

new User()
module.exports = Router
