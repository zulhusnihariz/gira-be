import { Entity, Column, OneToOne, JoinColumn } from 'typeorm'
import { BaseEntity } from './base.entity'
import { User } from './user.entity'

@Entity()
export class Credential extends BaseEntity {
  @Column()
  password: string

  @Column({ nullable: true })
  userId: string

  @OneToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User
}
