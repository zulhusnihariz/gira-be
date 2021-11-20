import { getCustomRepository } from 'typeorm'
import { Request, Response } from 'express'
import { Comment } from '../entities'
import { CommentRepository } from '../repositories'

const filter = { relations: [] }

export class CommentController {
  /* -------------------------------------------------------------------------- */
  /*                                   CREATE                                   */
  /* -------------------------------------------------------------------------- */
  async PostComment(req: Request, res: Response) {
    const comment: Comment = req.body
    const createdComment = await getCustomRepository(CommentRepository).save(comment)

    res.json(createdComment)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   GET ALL                                  */
  /* -------------------------------------------------------------------------- */

  async GetAllComments(req: Request, res: Response) {
    const comment = await getCustomRepository(CommentRepository).find(filter)

    res.json(comment)
  }

  /* -------------------------------------------------------------------------- */
  /*                                  GET BY ID                                 */
  /* -------------------------------------------------------------------------- */

  async GetCommentById(req: Request, res: Response) {
    const commentId: string = req.params.id
    const comment = await getCustomRepository(CommentRepository).findOne(commentId, filter)

    res.json(comment)
  }

  /* -------------------------------------------------------------------------- */
  /*                                UPDATE BY ID                                */
  /* -------------------------------------------------------------------------- */

  async UpdateComment(req: Request, res: Response) {
    const commentId: string = req.params.id
    const comment: Comment = req.body

    const updatedComment = await getCustomRepository(CommentRepository).update(commentId, comment)

    res.json(updatedComment)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   DELETE                                   */
  /* -------------------------------------------------------------------------- */

  async DeleteComment(req: Request, res: Response) {
    const commentId: string = req.params.id

    await getCustomRepository(CommentRepository).delete(commentId)

    return res.send({ message: 'successfully deleted' })
  }
}
