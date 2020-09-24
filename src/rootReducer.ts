import { combineReducers } from '@reduxjs/toolkit'
import todos from './features/todosSlice'

const rootReducer = combineReducers({ todos })

export type rootState = ReturnType<typeof rootReducer>
export default rootReducer
