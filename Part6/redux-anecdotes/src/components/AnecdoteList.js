import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const filteredAnecdotes = useSelector(state => {
    return state.anecdotes.filter((anecdote) => {
      return anecdote.content.toLowerCase().includes(filter.toLowerCase())
    })
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    dispatch(updateAnecdote(anecdote.id, updatedAnecdote))
    dispatch(setNotification(`you voted for ${anecdote.content}`, 50))
  }

  const byVotes = (b1, b2) => b2.votes - b1.votes

  return (
    <div>
      {filteredAnecdotes.sort(byVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList