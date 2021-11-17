import { Entity, Column, ManyToOne, JoinColumn, JoinTable } from 'typeorm'
import { BaseEntity } from './base.entity'
import { User } from './user.entity'
import { Project } from './project.entity'

@Entity()
export class UserProject extends BaseEntity {
  @Column({ select: false })
  userId: string

  @Column({ select: false })
  projectId: string

  @ManyToOne(() => User, user => user.projects, { onDelete: 'CASCADE' })
  user: User

  @ManyToOne(() => Project, project => project.members, { onDelete: 'CASCADE' })
  project: Project
}
