import dotenv from 'dotenv'

dotenv.config()

const config = {
  api: {
    cryptocurrencies: {
      url: process.env.CMC_API_URL,
      key: process.env.CMC_API_KEY,
    },
  },
  mongoDatabase: process.env.MONGO_DATABASE,
  mongoUser: process.env.MONGO_USER,
  mongoPassword: process.env.MONGO_PASSWORD,
  mongoHost: process.env.MONGO_HOST,
  mongoPort: process.env.MONGO_PORT,
  port: process.env.PORT || 5000,
  jwt: process.env.JWT_SECRET,
  clientId: process.env.GOOGLE_CLIENT_ID,
}

export default config
