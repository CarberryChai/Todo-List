import { combineReducers } from '@reduxjs/toolkit'
import todos from './features/todosSlice'
import todoShow from './features/todoShowSlice'
const rootReducer = combineReducers({ todos, todoShow })

export type rootState = ReturnType<typeof rootReducer>
export default rootReducer
