import { Router } from 'express'
import * as portfolioCtrl from './portfolio.controller'

const router = Router()

router.get('/', portfolioCtrl.getPortfolio)

router.post('/cryptocurrency', portfolioCtrl.addTransaction)

router.patch('/cryptocurrency', portfolioCtrl.updateTransaction)

router.delete('/cryptocurrency/:id', portfolioCtrl.removeCrypto)

router.post('/cryptocurrency/remove', portfolioCtrl.removeTransaction)

export default router
