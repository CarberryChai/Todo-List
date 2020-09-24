import React from 'react'
import './header.scss'
import { addTodo, Todo } from '../../features/todosSlice'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
const Header = (): JSX.Element => {
  const [text, setText] = React.useState('')
  const dispatch = useDispatch()
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setText(value.trim())
  }
  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const todo: Todo = {
      id: uuidv4(),
      text,
      done: false,
    }
    dispatch(addTodo(todo))
    setText('')
  }
  return (
    <form className='header' onSubmit={submitHandler}>
      <h1>todos</h1>
      <input
        type='text'
        value={text}
        className='new-todo'
        placeholder='What needs to be done?'
        onChange={changeHandler}
        autoFocus
      />
      <button type='submit' className='hidden'></button>
    </form>
  )
}

export default Header
