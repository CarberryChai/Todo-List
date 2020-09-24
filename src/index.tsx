import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import store from './store'
import { Provider } from 'react-redux'

const root = document.getElementById('root')
root?.classList.add('todoapp')

const render = () => {
  const App = require('./App').default

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    root
  )
}

render()

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render)
}
