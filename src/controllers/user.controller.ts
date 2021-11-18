import { getRepository, getCustomRepository } from 'typeorm'
import { Request, Response } from 'express'
import { Credential, User, Role } from '../entities'
import { SignUp } from '../types'
import { UserRepository } from '../repositories'

const filter = { relations: ['projects', 'projects.project'] }

export class UserController {
  /* -------------------------------------------------------------------------- */
  /*                                   CREATE                                   */
  /* -------------------------------------------------------------------------- */
  async PostUser(req: Request, res: Response) {
    const user: SignUp = req.body
    const createdUser = await getCustomRepository(UserRepository).registerUser(user)

    res.json(createdUser)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   GET ALL                                  */
  /* -------------------------------------------------------------------------- */

  async GetAllUsers(req: Request, res: Response) {
    const user = await getCustomRepository(UserRepository).find(filter)

    res.json(user)
  }

  /* -------------------------------------------------------------------------- */
  /*                                  GET BY ID                                 */
  /* -------------------------------------------------------------------------- */

  async GetUserById(req: Request, res: Response) {
    const userId: string = req.params.id
    const user = await getCustomRepository(UserRepository).findOne(userId, filter)

    res.json(user)
  }

  /* -------------------------------------------------------------------------- */
  /*                                UPDATE BY ID                                */
  /* -------------------------------------------------------------------------- */

  async UpdateUser(req: Request, res: Response) {
    const userId: string = req.params.id
    const user: User = req.body

    const updatedUser = await getCustomRepository(UserRepository).update(userId, user)

    res.json(updatedUser)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   DELETE                                   */
  /* -------------------------------------------------------------------------- */

  async DeleteUser(req: Request, res: Response) {
    const userId: string = req.params.id

    await getCustomRepository(UserRepository).deleteUser(userId)

    return res.send({ message: 'successfully deleted' })
  }

  /* -------------------------------------------------------------------------- */
  /*                                GET MANAGERS                                */
  /* -------------------------------------------------------------------------- */

  async GetManagers(req: Request, res: Response) {
    const managers = await getCustomRepository(UserRepository).getManagers()

    res.json(managers)
  }
}
