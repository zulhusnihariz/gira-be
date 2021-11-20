import { Entity, Column, ManyToOne, OneToMany, JoinTable } from 'typeorm'
import { BaseEntity } from './base.entity'
import { User } from './user.entity'
import { TicketAssignment } from './ticket-assignment.entity'
import { Project } from './project.entity'
import { Comment } from './comment.entity'

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

  @ManyToOne(() => Project, project => project.tickets)
  project: Project

  @OneToMany(() => TicketAssignment, userTickets => userTickets.ticket)
  assignedTo: TicketAssignment[]

  @OneToMany(() => Comment, comment => comment.ticket)
  comments: Comment[]
}
