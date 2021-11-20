import { EntityRepository, Repository, getRepository } from 'typeorm'
import { Ticket, TicketAssignment } from '../entities'
// import { User } from '../entities'
// import { Project } from '../entities'

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {
  /*
    Save: save entity and it's relations
    Update: update entity and it's relations
    Delete: delete entity and it's relations
  */
  async saveTicket(ticket: Ticket) {
    const { assignedTo, ...rest } = ticket
    // const {project, assignedTo, ...rest} = ticket

    /* 
        project: projectId
        assignedTo: [array of userId]
        comments:{
          sender: userId,
          message: 'Please fix this part ASAP'
        }
    */

    const createdTicket = await getRepository(Ticket).save(rest)

    for (const id of assignedTo) {
      await getRepository(TicketAssignment).save({ userId: `${id}`, ticketId: createdTicket.id })
    }

    return createdTicket
  }

  async updateTicket(ticketId: string, ticket: Ticket) {
    const { assignedTo, ...rest } = ticket
    const currentRelations = await getRepository(TicketAssignment).find({ where: { ticketId } })

    console.log(currentRelations)
    if (!!currentRelations.length)
      await getRepository(TicketAssignment).delete(currentRelations.map(ticket => ticket.id))

    for (const id of assignedTo) {
      await getRepository(TicketAssignment).save({ userId: `${id}`, ticketId: ticketId })
    }
    return await getRepository(Ticket).update(ticketId, rest)
  }

  async deleteTicket(ticketId: string) {
    const currentRelations = await getRepository(TicketAssignment).find({ where: { ticketId } })

    await getRepository(TicketAssignment).delete(currentRelations.map(ticket => ticket.id))
    await getRepository(Ticket).delete(ticketId)
  }
}
