import { Entity, Column, OneToOne, OneToMany, JoinTable } from 'typeorm'
import { BaseEntity } from './base.entity'
import { UserProject } from './user-project.entity'
import { User } from './user.entity'

@Entity()
export class Ticket extends BaseEntity {
  @Column()
  title: string

  @Column()
  description: string

  @OneToMany(() => UserProject, userProjects => userProjects.project)
  members: UserProject[]
}
