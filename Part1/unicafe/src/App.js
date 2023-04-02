import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Display = (props) => {
  return (
    <p>{props.name} {props.count}</p>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodEvent = () => {
    setGood(good + 1)
  }

  const handleNeutralEvent = () => {
    setNeutral(neutral + 1)
  }

  const handleBadEvent = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodEvent} text='good' />
      <Button handleClick={handleNeutralEvent} text='neutral' />
      <Button handleClick={handleBadEvent} text='bad'/>
      <h2>statistics</h2>
      <Display name='good' count={good}/>
      <Display name='neutral' count={neutral}/>
      <Display name='bad' count={bad}/>

    </div>
  )

}

export default App