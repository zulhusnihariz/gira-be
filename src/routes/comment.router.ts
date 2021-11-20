const express = require('express')
const Router = express.Router()
import { CommentController } from '../controllers'

class Comment extends CommentController {
  constructor() {
    super()
    Router.get('/', this.GetAllComments)
    Router.get('/id/:id', this.GetCommentById)
    Router.post('/', this.PostComment)
    Router.delete('/:id', this.DeleteComment)
    Router.patch('/:id', this.UpdateComment)
  }
}

new Comment()
module.exports = Router
