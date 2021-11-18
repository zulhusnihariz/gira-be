import { Factory, Seeder } from 'typeorm-seeding'
import { Role } from '../entities'

import * as roles from '../server/roles.json'

export default class CreateRoles implements Seeder {
  public async run(factory: Factory) {
    for (const role of roles.data) {
      // populate role table
      await factory(Role)().create(role)
    }
  }
}
