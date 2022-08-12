import * as path from 'path'
import moduleAlias from 'module-alias'

moduleAlias.addAliases({
  finpoq: __dirname,
  'finpoq-core': path.join(__dirname, '../..', 'core/src'),
})

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import config from './config/default'
import router from './routes/index'
import { updateCryptosPrice } from './components/cryptos/cryptos.engine'

const app = express()

app.set('port', config.port)

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)

setInterval(() => updateCryptosPrice(), 1000 * 216) // 5 min

export default app
