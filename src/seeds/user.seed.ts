import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User, Credential } from '../entities'

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection) {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id: '7099e081-2261-4725-8a9c-336952a939e2',
          username: 'Michael',
          email: 'michael@gmail.com',
          mobile: '013-1231251',
          roleId: '06d830c6-85d4-4bef-8d2d-197b3ceb3b93',
        },
        {
          id: '341d94ef-1e8a-4f2c-992d-956e23004909',
          username: 'Molly',
          email: 'molly@gmail.com',
          mobile: '013-3216543',
          roleId: '3aee61eb-6a83-4a72-b1aa-311323710c3b',
        },
      ])
      .execute()

    await connection
      .createQueryBuilder()
      .insert()
      .into(Credential)
      .values([
        {
          userId: '7099e081-2261-4725-8a9c-336952a939e2',
          password: '1234',
        },
        {
          userId: '341d94ef-1e8a-4f2c-992d-956e23004909',
          password: '1234',
        },
      ])
      .execute()
  }
}
