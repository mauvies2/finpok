import config from './config/default'
import app from './app'
import './database'

app.listen(config.port, () => {
  console.log('Server listening on port', config.port)
})
