import { define } from 'typeorm-seeding'
import { Ticket, TicketAssignment } from '../entities'

define(Ticket, (ticketData: Ticket) => {
  const ticket = new Ticket()

  ticket.id = ticketData.id
  ticket.title = ticketData.title
  ticket.description = ticketData.description
  ticket.status = ticketData.status
  ticket.priority = ticketData.priority
  ticket.type = ticketData.type
  ticket.estimatedTime = ticketData.estimatedTime
  ticket.author = ticketData.author
  ticket.project = ticketData.project

  return ticket
})

define(TicketAssignment, (ticketAssignmentData: TicketAssignment) => {
  const ticketAssignment = new TicketAssignment()

  ticketAssignment.userId = ticketAssignmentData.userId
  ticketAssignment.ticketId = ticketAssignmentData.ticketId

  return ticketAssignment
})
