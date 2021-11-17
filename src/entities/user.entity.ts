import {
  Entity,
  Column,
  OneToOne,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import { Credential } from './credential.entity'
import { Role } from './role.entity'
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

  @Column({ nullable: true })
  roleId: string

  //TODO: setup cascade delete for user-credential
  @OneToOne(() => Credential)
  credential: Credential

  @ManyToOne(() => Role, role => role.user, { eager: true })
  role: Role

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
