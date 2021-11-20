import { Entity, Column, OneToOne, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { Credential } from './credential.entity'
import { Role } from './role.entity'
import { UserProject } from './user-project.entity'
import { Ticket } from './ticket.entity'
import { TicketAssignment } from './ticket-assignment.entity'
@Entity()
export class User extends BaseEntity {
  @Column()
  username: string

  @Column()
  email: string

  @Column()
  mobile: string

  @Column({ nullable: true })
  roleId: string

  //TODO: setup cascade delete for user-credential
  @OneToOne(() => Credential)
  credential: Credential

  @ManyToOne(() => Role, role => role.user, { eager: true })
  role: Role

  @OneToMany(() => UserProject, userProjects => userProjects.user)
  projects: UserProject[]

  @OneToMany(() => Ticket, ticket => ticket.author)
  ticketIssued: Ticket[]

  @OneToMany(() => TicketAssignment, userTickets => userTickets.user)
  ticketAssigned: TicketAssignment[]
}
