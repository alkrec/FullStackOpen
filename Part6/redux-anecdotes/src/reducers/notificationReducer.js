import { createSlice } from '@reduxjs/toolkit'

const initialState = 'initial message'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload
    }
  }
})

export default notificationSlice.reducer