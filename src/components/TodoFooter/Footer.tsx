import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TodoShow, updateShow } from '../../features/todoShowSlice'
import { rootState } from '../../rootReducer'
import { Todos, clearCompleted } from '../../features/todosSlice'
import './todo-footer.scss'

const TodoFooter = (): JSX.Element | null => {
  const todos = useSelector<rootState, Todos>(state => state.todos)
  const todoShow = useSelector<rootState, TodoShow>(state => state.todoShow)
  const left = useMemo(() => {
    return todos.filter(item => !item.done).length
  }, [todos])
  const shows: TodoShow[] = ['All', 'Active', 'Completed']
  const dispatch = useDispatch()
  if (todos.length === 0) {
    return null
  }
  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{left}</strong>
      </span>
      <ul className='filters'>
        {shows.map(r => (
          <li key={r} onClick={() => dispatch(updateShow(r))}>
            <a className={`${todoShow === r ? 'selected' : ''}`} href={`#${r}`}>
              {r}
            </a>
          </li>
        ))}
      </ul>
      <button
        className='clear-completed'
        onClick={() => dispatch(clearCompleted())}
      >
        Clear completed
      </button>
    </footer>
  )
}

export default TodoFooter
