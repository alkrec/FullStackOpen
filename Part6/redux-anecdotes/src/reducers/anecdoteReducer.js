import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push({ //typically this violates the immutability rule of changes to state, but the Immer library handles this
        content: content,
        votes: 0,
        id: getId()
      })
    },
    voteForAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    }
  }
})

export const { createAnecdote, voteForAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer



// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch(action.type) {
//     // Adding a new anecdote to the anecdate array
//     case 'ADD': {
//       return state.concat(action.payload) //use concat, which returns a new array so that immutability is intact
//     }
//     // Handles the increase in votes when vote button pressed
//     case 'VOTE': {
//       const id = action.payload.id
//       const anecdoteToChange = state.find(n => n.id === id)
//       const changedAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1 
//       }
//       return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
//     }
//     default:
//       return state
//   }
// }

// export const createAnecdote = (content) => {
//     return {
//       type: 'ADD',
//       payload: {
//         id: getId(),
//         content: content,
//         votes: 0
//       }
//     }
// }

// export const voteAnecdote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id }
//   }
// }

// export default reducer