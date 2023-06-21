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
    setMessage(state, action) {
      const message = action.payload
      return message
    },
    removeMessage(state, action) {
      return null
    }
  }
})

export const { setVoteMessage, setAddMessage, removeMessage, setMessage } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(setMessage(null))
    }, time * 100)
  }
}

export default notificationSlice.reducer