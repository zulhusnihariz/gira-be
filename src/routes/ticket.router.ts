const express = require('express')
const Router = express.Router()
import { TicketController } from '../controllers'

class Ticket extends TicketController {
  constructor() {
    super()
    Router.get('/', this.GetAllTickets)
    Router.get('/id/:id', this.GetTicketById)
    Router.post('/', this.PostTicket)
    Router.delete('/:id', this.DeleteTicket)
    Router.patch('/:id', this.UpdateTicket)
  }
}

new Ticket()
module.exports = Router
