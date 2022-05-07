import Router from 'express'
import * as authCtrl from './auth.controller'
import auth from '../../middleware/auth'

const router = Router()

router.get('/validate', auth, authCtrl.validateToken)
router.post('/register', authCtrl.registerUser)
router.post('/login', authCtrl.loginUser)
router.post('/google-login', authCtrl.handleGoogleAuth)

export default router
