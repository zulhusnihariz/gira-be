import {
  Entity,
  Column,
  OneToOne,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm'
import { Credential } from './credential.entity'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  mobile: string

  //TODO: setup cascade delete for user-credential
  @OneToOne(() => Credential)
  credential: Credential

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
