import { Router } from 'express'

import authRoutes from '../components/auth/auth.routes'
import auth from '../middleware/auth'
import PortfolioController from 'finpoq/components/portfolio/controller/portfolio.controller'
import PortfolioRepo from 'finpoq/components/portfolio/repository/portfolio.repository'
import CryptoRepo from 'finpoq/components/cryptos/repository/crypto.repository'
import CryptoController from 'finpoq/components/cryptos/controller/cryptos.controller'

const router = Router()

const cryptoRepo = new CryptoRepo()
const portfolioRepo = new PortfolioRepo()

const cryptoController = new CryptoController(cryptoRepo)
const portfolioController = new PortfolioController(portfolioRepo, cryptoRepo)

router.use('/api/cryptocurrencies', cryptoController.router)
router.use('/api/portfolio', auth, portfolioController.router)
router.use('/api/auth', authRoutes)

export default router
