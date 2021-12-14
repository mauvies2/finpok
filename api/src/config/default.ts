import dotenv from 'dotenv'

dotenv.config()

const config = {
  apiUrl: {
    cryptocurrencies: process.env.COINMARKETCAP_URL || 'https://pro-api.coinmarketcap.com/v1',
  },

  mongoDatabase: process.env.MONGO_DATABASE || 'finpokdb',

  mongoUser: process.env.MONGO_USER || 'finpok',

  mongoPassword: process.env.MONGO_PASSWORD || 'finpok123',

  mongoHost: process.env.MONGO_HOST || process.env.NODE_ENV === 'dev' ? 'finpok.tvwve.mongodb.net' : 'finpok.tvwve.mongodb.net',
  
  mongoPort: process.env.MONGO_HOST || process.env.NODE_ENV === 'dev' ? 27017 : 27015,

  port: process.env.PORT || 5000,

  jwt: 'secret',
}

export default config
