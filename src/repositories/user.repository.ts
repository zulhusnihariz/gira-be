import { EntityRepository, Repository, getRepository } from 'typeorm'
import { User, Credential, Role, UserProject } from '../entities'
import { SignUp } from '../types'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /*
    Save: save entity and it's relations
    Update: update entity and it's relations
    Delete: delete entity and it's relations
  */
  async registerUser(user: SignUp) {
    const { password, ...rest } = user
    const createdUser = await getRepository(User).save(rest)
    await getRepository(Credential).save({ password, userId: createdUser.id })

    return createdUser
  }

  async deleteUser(userId: string) {
    const currentRelations = await getRepository(UserProject).find({ where: { userId } })

    await getRepository(UserProject).delete(currentRelations.map(user => user.id))
    await getRepository(User).delete(userId)
  }

  async getManagers() {
    const roleManager = await getRepository(Role).find({ where: { name: 'manager' } })
    const managers = await getRepository(User).find({
      where: { roleId: roleManager[0].id },
    })

    return managers
  }
}
