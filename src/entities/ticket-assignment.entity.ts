import { Entity, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { User } from './user.entity'
import { Ticket } from './ticket.entity'

@Entity()
export class TicketAssignment extends BaseEntity {
  @Column({ select: false })
  userId: string

  @Column({ select: false })
  ticketId: string

  @ManyToOne(() => User, user => user.ticketAssigned)
  user: User

  @ManyToOne(() => Ticket, ticket => ticket.assignedTo)
  ticket: Ticket
}
