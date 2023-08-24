import { useQuery, useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import NotificationContext from '../NotificationContext'
import { useContext } from 'react'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (data) => {
      notificationDispatch({ type: 'ADDED', anecdote: data.content})
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      notificationDispatch({ type: 'ERROR' })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const result = newAnecdoteMutation.mutate({
      content: content,
      votes: 0
    })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
