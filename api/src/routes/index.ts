import { Router } from 'express'

import portfolioRoutes from '../components/portfolio/portfolios.routes'
import cryptoRoutes from '../components/cryptos/cryptos.routes'
import authRoutes from '../components/auth/auth.routes'
import auth from '../middleware/auth'

const router = Router()

router.use('/cryptocurrencies', cryptoRoutes)

router.use('/portfolio', auth, portfolioRoutes)

router.use('/auth', authRoutes)

export default router
