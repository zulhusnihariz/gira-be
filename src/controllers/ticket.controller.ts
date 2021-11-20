import { getCustomRepository } from 'typeorm'
import { Request, Response } from 'express'
import { Ticket } from '../entities'
import { TicketRepository } from '../repositories'

const filter = { relations: ['assignedTo', 'assignedTo.user'] }

export class TicketController {
  /* -------------------------------------------------------------------------- */
  /*                                   CREATE                                   */
  /* -------------------------------------------------------------------------- */
  async PostTicket(req: Request, res: Response) {
    const ticket: Ticket = req.body
    const createdTicket = await getCustomRepository(TicketRepository).saveTicket(ticket)

    res.json(createdTicket)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   GET ALL                                  */
  /* -------------------------------------------------------------------------- */

  async GetAllTickets(req: Request, res: Response) {
    const ticket = await getCustomRepository(TicketRepository).find(filter)

    res.json(ticket)
  }

  /* -------------------------------------------------------------------------- */
  /*                                  GET BY ID                                 */
  /* -------------------------------------------------------------------------- */

  async GetTicketById(req: Request, res: Response) {
    const ticketId: string = req.params.id
    const ticket = await getCustomRepository(TicketRepository).findOne(ticketId, filter)

    res.json(ticket)
  }

  /* -------------------------------------------------------------------------- */
  /*                                UPDATE BY ID                                */
  /* -------------------------------------------------------------------------- */

  async UpdateTicket(req: Request, res: Response) {
    const ticketId: string = req.params.id
    const ticket: Ticket = req.body

    const updatedTicket = await getCustomRepository(TicketRepository).updateTicket(ticketId, ticket)

    res.json(updatedTicket)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   DELETE                                   */
  /* -------------------------------------------------------------------------- */

  async DeleteTicket(req: Request, res: Response) {
    const ticketId: string = req.params.id

    await getCustomRepository(TicketRepository).deleteTicket(ticketId)

    return res.send({ message: 'successfully deleted' })
  }
}
