import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const MostVoted = ({votes, anecdotes}) => {
  let mostVoted= votes.indexOf(Math.max(...votes))
  return (
    <div>
      {anecdotes[mostVoted]}
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  
  const initialVotes = () => new Uint8Array(6)

  const [selected, setSelected] = useState(0)
  const [votes, updateVotes] = useState(initialVotes)
  const [currentVote, setCurrent] = useState(0)
  
  const setAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * 6)
    setSelected(randomNumber)
    setCurrent(votes[randomNumber])
  }

  const voteAnecdote = (selected) => {
      console.log('voted', selected)
      const copy = votes
      copy[selected] += 1
      updateVotes(copy)
      setCurrent(copy[selected])
      console.log(votes)
    }
  
  console.log("selected anecdote:", anecdotes[selected])
  console.log("votes:", votes[selected])
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {currentVote} votes</p>
      <Button handleClick={() => setAnecdote()} text="next anecdote" />
      <Button handleClick={() => voteAnecdote(selected)} text="vote" />
      <h2>Anecdote with most votes</h2>
      <MostVoted votes={votes} anecdotes = {anecdotes}/>
    </div>
  )
}

export default App
