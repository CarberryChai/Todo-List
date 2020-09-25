import React from 'react'
import './App.css'
import Header from './components/TodoHeader/Header'
import TodoList from './components/TodoList/TodoList'
import Footer from './components/TodoFooter/Footer'

function App(): JSX.Element {
  return (
    <>
      <Header></Header>
      <TodoList></TodoList>
      <Footer></Footer>
    </>
  )
}

export default App
