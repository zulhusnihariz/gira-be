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
      ])
      .execute()
  }
}
