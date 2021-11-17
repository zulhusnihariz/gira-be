import { define } from 'typeorm-seeding'
import { User } from '../entities/'

define(User, (userData: User) => {
  const user = new User()

  user.username = userData.username
  user.email = userData.email
  user.mobile = userData.mobile
  return user
})
