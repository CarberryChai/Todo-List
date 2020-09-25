import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TodoShow = 'All' | 'Completed' | 'Active'

const pathshowSlice = createSlice({
  name: 'todoShow',
  initialState: 'All' as TodoShow,
  reducers: {
    updateShow(state, action: PayloadAction<TodoShow>) {
      // 真坑！如果payload是原始值直接返回
      return action.payload
    },
  },
})

export const { updateShow } = pathshowSlice.actions

export default pathshowSlice.reducer
