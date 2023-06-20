import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setVoteMessage(state, action) {
      const content = action.payload
      return `you voted '${content}'`
    },
    setAddMessage(state, action) {
      const content = action.payload
      return `you added '${content}'`
    },
    removeMessage(state, action) {
      return null
    }
  }
})

export const { setVoteMessage, setAddMessage, removeMessage } = notificationSlice.actions

export default notificationSlice.reducer