import { Factory, Seeder } from 'typeorm-seeding'
import { Ticket, TicketAssignment } from '../entities'

import * as ticket from '../server/ticket.json'

export default class createTickets implements Seeder {
  public async run(factory: Factory) {
    // populate 'ticket' table
    for (const key of Object.keys(ticket.details)) {
      const tickets = await factory(Ticket)().create(ticket.details[key])

      // populate 'ticket_assignment' table
      for (const id of ticket.details[key].assignedTo) {
        await factory(TicketAssignment)().create({ userId: id, ticketId: tickets.id })
      }
    }
  }
}
