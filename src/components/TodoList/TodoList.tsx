import React, { useState, useMemo } from 'react'
import './todo-list.scss'
import { useSelector, useDispatch } from 'react-redux'
import { rootState } from '../../rootReducer'
import {
  Todos,
  toggleTodo,
  editTodo,
  Todo,
  deleteTodo,
  completeAll,
} from '../../features/todosSlice'
import { TodoShow } from '../../features/todoShowSlice'
const TodoList = (): JSX.Element | null => {
  const todos = useSelector<rootState, Todos>(state => state.todos)
  const todoShow = useSelector<rootState, TodoShow>(state => state.todoShow)
  const dispatch = useDispatch()
  const [isEditing, setEditing] = useState(false)
  const isCompletedAll = useMemo(() => todos.every(i => i.done), [todos])
  const todoList = useMemo(() => {
    switch (todoShow) {
      case 'All':
        return todos
      case 'Active':
        return todos.filter(item => !item.done)
      case 'Completed':
        return todos.filter(item => item.done)
    }
  }, [todoShow, todos])
  const toggleHandler = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (e.target.type === 'checkbox') {
      dispatch(toggleTodo(id))
    }
  }
  const editHandler = (
    todo: Todo,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    dispatch(editTodo({ ...todo, text: e.target.value }))
  }
  const editingHandler = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>
  ) => {
    if (e.type === 'blur' || ('key' in e && e.key === 'Enter')) {
      setEditing(false)
    }
  }
  const deleteItem = (id: string) => {
    dispatch(deleteTodo(id))
  }
  const toggleAllHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(completeAll(e.target.checked))
  }
  if (todoList.length === 0) {
    return null
  }
  return (
    <div className='main'>
      <input
        id='toggle-all'
        className='toggle-all'
        type='checkbox'
        checked={isCompletedAll}
        onChange={e => toggleAllHandler(e)}
      />
      <label htmlFor='toggle-all'>Mark all as complete</label>
      <ul className='todo-list'>
        {todoList.map(item => (
          <li
            className={`${item.done ? 'completed' : ''} ${
              isEditing ? 'editing' : ''
            }`}
            key={item.id}
          >
            <div className='view'>
              <input
                className='toggle'
                type='checkbox'
                checked={item.done}
                onChange={e => toggleHandler(item.id, e)}
              />
              <label onDoubleClick={() => setEditing(true)}>{item.text}</label>
              <button className='destroy' onClick={() => deleteItem(item.id)} />
            </div>
            <input
              className='edit'
              value={item.text}
              onChange={e => editHandler(item, e)}
              onBlur={e => editingHandler(e)}
              onKeyUp={e => editingHandler(e)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
