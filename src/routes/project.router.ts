const express = require('express')
const Router = express.Router()
import { ProjectController } from '../controllers'

class Project extends ProjectController {
  constructor() {
    super()
    Router.get('/', this.GetAllProjects)
    Router.get('/:id', this.GetProjectById)
    Router.post('/', this.PostProject)
    Router.delete('/:id', this.DeleteProject)
    Router.patch('/:id', this.UpdateProject)
  }
}

new Project()
module.exports = Router
