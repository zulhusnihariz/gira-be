import { define } from 'typeorm-seeding'
import { User, Credential } from '../entities/'

define(User, (userData: User) => {
  const user = new User()

  user.username = userData.username
  user.email = userData.email
  user.mobile = userData.mobile

  return user
})

define(Credential, (credentialData: Credential) => {
  const credential = new Credential()

  credential.userId = credentialData.userId
  credential.password = credentialData.password

  return credential
})
