import mongoose, { ConnectOptions } from 'mongoose'
import config from './config/default';

(async () => {
  console.log('Database is connecting')
  try {
    const mongooseOptions: ConnectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      user: config.mongoUser,
      pass: config.mongoPassword,
    }
    const db = await mongoose.connect(
      `mongodb+srv://${config.mongoUser}:${config.mongoPassword}@${config.mongoHost}/${config.mongoDatabase}?retryWrites=true&w=majority`,
      mongooseOptions
    )
    console.log('Database is connected to:', db.connection.name)
  } catch (error) {
    console.log(error)
  }
})()
