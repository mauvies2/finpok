import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from 'finpoq/app'
import { ThemeProvider } from './store/theme/theme-context'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <div className="dark:bg-dark dark:text-dark-text absolute top-0 left-0 right-0 bg-white transition-all">
        <App />
      </div>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
