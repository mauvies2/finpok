import { Router } from 'express'
import * as userCtrl from './users.controller'

const router = Router()

router.get('/', userCtrl.getUsers)

// auth

router.get('/:id', userCtrl.getUser)

router.delete('/:id', userCtrl.deleteUser)

router.put('/:id', userCtrl.updateUser)

export default router
