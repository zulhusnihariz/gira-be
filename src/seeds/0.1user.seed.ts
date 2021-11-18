import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User, Credential } from '../entities'
import * as users from '../server/users.json'

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection) {
    for (const user of users.data) {
      // populate user table
      await factory(User)().create(user)

      // populate credential table
      await factory(Credential)().create({ userId: user.id, password: '1234' })
    }
  }
}
