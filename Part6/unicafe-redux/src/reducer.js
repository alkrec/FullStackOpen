const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newGood = state.good + 1  //IS THIS CORRECT????
      return {...state, good: newGood} //IS THIS CORRECT????
    case 'OK':
      const newOK = state.ok + 1  //IS THIS CORRECT????
      return {...state, ok: newOK} //IS THIS CORRECT????
      return state
    case 'BAD':
      const newBad = state.bad + 1  //IS THIS CORRECT????
      return {...state, bad: newBad} //IS THIS CORRECT????
      return state
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer
