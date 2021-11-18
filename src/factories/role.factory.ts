import { define } from 'typeorm-seeding'
import { Role } from '../entities'

define(Role, (roleData: Role) => {
  const role = new Role()

  role.id = roleData.id
  role.name = roleData.name

  return role
})
