import { Entity, Column, OneToMany, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { User } from './user.entity'
import { Ticket } from './ticket.entity'

@Entity()
export class Comment extends BaseEntity {
  @Column({ nullable: true })
  message: string

  @ManyToOne(() => User, user => user.comments)
  sender: string

  @ManyToOne(() => Ticket, ticket => ticket.comments)
  ticket: Ticket
}
