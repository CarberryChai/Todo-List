import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Todo {
  id: string
  text: string
  done: boolean
}
export type Todos = ReadonlyArray<Todo>
const initialState: Todos = JSON.parse(
  window.localStorage.getItem('todo-list') ?? '[]'
)
const updateLocalStorage = (state: Todos) =>
  window.localStorage.setItem('todo-list', JSON.stringify(state))
const todoslice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      state.push(action.payload)
      updateLocalStorage(state)
    },
    editTodo(state, action: PayloadAction<Todo>) {
      const todo = state.find(item => item.id === action.payload.id)
      if (todo) {
        todo.text = action.payload.text
        updateLocalStorage(state)
      }
    },
    toggleTodo(state, action: PayloadAction<string>) {
      const todo = state.find(item => item.id === action.payload)
      if (todo) {
        todo.done = !todo.done
        updateLocalStorage(state)
      }
    },
    deleteTodo(state, action: PayloadAction<string>) {
      const idx = state.findIndex(item => item.id === action.payload)
      if (idx >= 0) {
        state.splice(idx, 1)
        updateLocalStorage(state)
      }
    },
    completeAll(state, action: PayloadAction<boolean>) {
      for (const item of state) {
        item.done = action.payload
      }
      updateLocalStorage(state)
    },
  },
})
export const {
  addTodo,
  toggleTodo,
  completeAll,
  editTodo,
  deleteTodo,
} = todoslice.actions
export default todoslice.reducer
