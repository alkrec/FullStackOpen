import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Display = (props) => {
  return (
    <p>{props.name} {props.output}</p>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodEvent = () => {
    const updatedGood = good + 1
    const updatedTotal = updatedGood + bad + neutral
    setGood(updatedGood)
    setTotal(updatedTotal)
    setAvg((updatedGood - bad) / updatedTotal)
    setPositive((updatedGood/updatedTotal) * 100)
  }

  const handleNeutralEvent = () => {
    const updatedNeutral = neutral + 1
    const updatedTotal = good + bad + updatedNeutral
    setNeutral(updatedNeutral)
    setTotal(updatedTotal)
    setAvg((good - bad) / updatedTotal)
    setPositive((good/updatedTotal) * 100)
  }

  const handleBadEvent = () => {
    const updatedBad = bad + 1
    const updatedTotal = good + updatedBad + neutral
    setBad(updatedBad)
    setTotal(updatedTotal)
    setAvg((good - updatedBad) / updatedTotal)
    setPositive((good/updatedTotal) * 100)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodEvent} text='good' />
      <Button handleClick={handleNeutralEvent} text='neutral' />
      <Button handleClick={handleBadEvent} text='bad'/>
      <h2>statistics</h2>
      <Display name='good' output={good}/>
      <Display name='neutral' output={neutral}/>
      <Display name='bad' output={bad}/>
      <Display name='all' output={total}/>
      <Display name='average' output={avg}/>
      <Display name='positive' output={`${positive} %`}/>
    </div>
  )

}

export default App