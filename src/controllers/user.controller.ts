import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import { Credential, User } from '../entities'
import { SignUp } from '../types'

export class UserController {
  async GetAllUser(req: Request, res: Response) {
    const user = await getRepository(User).find()

    res.json(user)
  }

  async GetUserById(req: Request, res: Response) {
    const userId: string = req.params.id
    const user = await getRepository(User).findOne(userId)

    res.json(user)
  }

  async PostUser(req: Request, res: Response) {
    const { password, ...userData }: SignUp = req.body
    const user = await getRepository(User).save(userData)
    await getRepository(Credential).save({ password, userId: user.id })

    res.json(user)
  }

  async UpdateUser(req: Request, res: Response) {
    const userId: string = req.params.id
    const user: User = req.body

    const updatedUser = await getRepository(User).update(userId, user)

    res.json(updatedUser)
  }

  async DeleteUser(req: Request, res: Response) {
    const userId: string = req.params.id
    await getRepository(User).delete(userId)

    return res.send({ message: 'successfully deleted' })
  }
}
