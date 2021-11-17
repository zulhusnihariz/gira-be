import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Role } from '../entities/'

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection) {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([
        {
          id: 'e111bcb1-e049-4bfb-a3c7-7a6441dfd56d',
          name: 'admin',
        },
        {
          id: '3aee61eb-6a83-4a72-b1aa-311323710c3b',
          name: 'manager',
        },
        {
          id: '06d830c6-85d4-4bef-8d2d-197b3ceb3b93',
          name: 'developer',
        },
      ])
      .execute()
  }
}
