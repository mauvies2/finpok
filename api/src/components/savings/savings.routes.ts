import { Router } from 'express'
import * as savingsCtrl from './savings.controller'

const router = Router()

router.get('/', savingsCtrl.getSavings)

router.get('/:id', savingsCtrl.getSaving)

router.post('/', savingsCtrl.createSavings)

router.delete('/:id', savingsCtrl.deleteSaving)

router.put('/:id', savingsCtrl.updateSaving)

export default router
