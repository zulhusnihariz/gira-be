import * as express from 'express'
import { createConnection } from 'typeorm'

const RouterList = require('./routes')

// create typeorm connection

createConnection().then(async connection => {
  const app = express()
  app.use(express.json())

  RouterList.forEach(router => {
    app.use(router.BaseURL, router.Router)
  })

  // start express server
  app.listen(3000, () => console.log('Server is running'))
})
