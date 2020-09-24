import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Header from './components/TodoHeader/Header'
import TodoList from './components/TodoList/TodoList'

export type Routes = '/' | '/completed' | '/active'
const routes: Routes[] = ['/', '/active', '/completed']
function App(): JSX.Element {
  return (
    <Router>
      <Route path='/' component={Header}></Route>
      {routes.map(path => (
        <Route path={path} component={TodoList} key={path}></Route>
      ))}
    </Router>
  )
}

export default App
