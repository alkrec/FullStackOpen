import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADDED":
      state = action.anecdote
      return `anecdote '${state}' was successfully added`
    case "VOTED":
      state = action.anecdote
      return `anecdote '${state}' voted`
    case "ERROR":
      return `too short anecdote, must have length 5 or more`
    default:
      return ''
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={ [notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext