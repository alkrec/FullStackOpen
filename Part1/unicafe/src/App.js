import { useState } from 'react'

const Statistics = (props) => {
  if (props.totalCount !== 0) {
      return (
        <>
          <h2>statistics</h2>
          <StatisticLine name="good" output={props.goodCount}/>
          <StatisticLine name="neutral" output={props.neutralCount}/>
          <StatisticLine name="bad" output={props.badCount}/>
          <StatisticLine name="total" output={props.totalCount}/>
          <StatisticLine name="average" output={props.avg}/>
          <StatisticLine name="positive" output={`${props.positive} %`}/>
        </>
      )
  }
  return (
    <>
      <p>No feedback given</p>
    </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
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
      <Statistics 
        goodCount={good}
        neutralCount={neutral}
        badCount={bad}
        totalCount={total}
        avg={avg}
        positive={positive}
      />
    </div>
  )

}

export default App