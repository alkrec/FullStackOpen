import { createSlice } from '@reduxjs/toolkit'
const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterAnecdotes(state, action) {
      // console.log(JSON.parse(JSON.stringify(state)))
      const filter = action.payload
      return filter
    }
  }
})

export const { filterAnecdotes } = filterSlice.actions
export default filterSlice.reducer