import { EntityRepository, Repository, getRepository } from 'typeorm'
import { Comment, User, Ticket } from '../entities'

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  /*
    Save: save entity and it's relations
    Update: update entity and it's relations
    Delete: delete entity and it's relations
  */
}
