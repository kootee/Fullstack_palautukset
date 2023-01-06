import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  const total = props.value[0] + props.value[1] + props.value[2]
  const average = ((props.value[0] - props.value[2])/total).toFixed(1)
  const positive = (props.value[0] / total * 100).toFixed(1)
  console.log(props.value[0])
  console.log(props.value[1])
  console.log('total', total)
  
  if (total < 1) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  
  return (
    <div>
      <StatisticLine text="good" value ={props.value[0]} />
      <StatisticLine text="neutral" value ={props.value[1]} />
      <StatisticLine text="bad" value ={props.value[2]} />
      <StatisticLine text="Total number of feedback" value ={total}/>
      <StatisticLine text="Feedback average" value ={average}/>
      <StatisticLine text="% of positive" value ={positive}/>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
      <table>
        <tbody>
          <tr>
            <td>{text}:</td> 
            <td>{value}</td>
          </tr>
        </tbody>
      </table>
    )
  }

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodValue = newFeedback => setGood(newFeedback)
  
  const setNeutralValue = newFeedback => setNeutral(newFeedback)
  
  const setBadValue = newFeedback => setBad(newFeedback)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGoodValue(good + 1)} text="Good" />
      <Button handleClick={() => setNeutralValue(neutral + 1)} text="Neutral"/>
      <Button handleClick={() => setBadValue(bad + 1)} text="Bad"/>
      <h2>Statistics</h2>
      <Statistics value={[good, neutral, bad]} />
    </div>
  )
}

export default App
