import { Entity, Column, ManyToOne, OneToMany, JoinTable } from 'typeorm'
import { BaseEntity } from './base.entity'
import { User } from './user.entity'
import { TicketAssignment } from './ticket-assignment.entity'

@Entity()
export class Ticket extends BaseEntity {
  @Column()
  title: string

  @Column()
  description: string

  @Column()
  status: string

  @Column()
  priority: string

  @Column()
  type: string

  @Column()
  estimatedTime: string

  @ManyToOne(() => User, user => user.ticketIssued, { eager: true })
  author: User

  @OneToMany(() => TicketAssignment, userTickets => userTickets.ticket)
  assignedTo: TicketAssignment[]

  // @Column()
  // comments: string
  // @Column()
  // comments: string
}
