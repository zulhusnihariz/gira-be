import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import { Credential, User } from '../entities'
import { SignUp } from '../types'

const filter = { relations: ['projects', 'projects.project'] }

export class UserController {
  /* -------------------------------------------------------------------------- */
  /*                                   CREATE                                   */
  /* -------------------------------------------------------------------------- */
  async PostUser(req: Request, res: Response) {
    const { password, ...userData }: SignUp = req.body
    const user = await getRepository(User).save(userData)
    await getRepository(Credential).save({ password, userId: user.id })

    res.json(user)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   GET ALL                                  */
  /* -------------------------------------------------------------------------- */

  async GetAllUsers(req: Request, res: Response) {
    const user = await getRepository(User).find(filter)

    res.json(user)
  }

  /* -------------------------------------------------------------------------- */
  /*                                  GET BY ID                                 */
  /* -------------------------------------------------------------------------- */

  async GetUserById(req: Request, res: Response) {
    const userId: string = req.params.id
    const user = await getRepository(User).findOne(userId)

    res.json(user)
  }

  /* -------------------------------------------------------------------------- */
  /*                                UPDATE BY ID                                */
  /* -------------------------------------------------------------------------- */

  async UpdateUser(req: Request, res: Response) {
    const userId: string = req.params.id
    const user: User = req.body

    const updatedUser = await getRepository(User).update(userId, user)

    res.json(updatedUser)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   DELETE                                   */
  /* -------------------------------------------------------------------------- */

  async DeleteUser(req: Request, res: Response) {
    const userId: string = req.params.id
    await getRepository(User).delete(userId)

    return res.send({ message: 'successfully deleted' })
  }
}
