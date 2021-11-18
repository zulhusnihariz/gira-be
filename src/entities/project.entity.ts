import { Entity, Column, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { UserProject } from './user-project.entity'

@Entity()
export class Project extends BaseEntity {
  @Column()
  title: string

  @Column()
  description: string

  @OneToMany(() => UserProject, userProjects => userProjects.project)
  members: UserProject[]
}
