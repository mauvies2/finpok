import { Router } from 'express'
import * as crypto from './cryptos.controller'

const router = Router()

router.get('/', crypto.getCryptos)

router.get('/update', crypto.updateCryptos)

export default router
