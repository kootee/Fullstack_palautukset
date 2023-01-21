import { useState, useEffect } from 'react'
import axios from 'axios'

const Show = ({ person, filter }) => {
  console.log('Show name', person.name)
  console.log('filter is', filter)
  if (filter === '' || filterPerson({person, filter})) {
    return (
      <div>
        <li>{person.name} {person.number}</li>
      </div>
    )
  } else {
    console.log('name not shown')
    return
  }
}

const checkDuplicate = ( {newName, persons} ) => {
  const filteredList = persons.filter(person => person.name === newName)
  
  if (filteredList.length > 0) {
    console.log("was false")
    return false
  }
  console.log("was true")
  return true
}

const filterPerson = ( {person, filter} ) => {
  const name = person.name.toLowerCase()
  const filterString = filter.toLowerCase()

  return (
    name.includes(filterString)
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
        setPersons(response.data)
        console.log('promise fulfilled')
    })
  }

  useEffect(hook, [])


  const addPerson = (event) => {
    event.preventDefault()
    console.log('adding name', newName)
    console.log('adding number', newNumber)

    const nameObject = {
      name: newName,
      number: newNumber
    }

    setNewName('')
    setNewNumber('')

    if (checkDuplicate({newName, persons})) {
      console.log(nameObject)
      setPersons(persons.concat(nameObject))
      console.log('name added')
      console.log(persons)
      return
    } else {
      return window.alert(`${newName} already exists in phonebook`)
    }
  }

  const handleFilter = (event) => {
    console.log('filter handled')
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log('name change', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('number change', event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div> filter shown with: <input
        value={newFilter}
        onChange={handleFilter}
      /></div>
      <h3>Add a new</h3>
      <form onSubmit={addPerson}>
        <div>name: <input 
          value={newName} 
          onChange={handleNameChange}
        /></div>
        <div>number: <input 
          value={newNumber} 
          onChange={handleNumberChange}
        /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h3>Numbers</h3>
      <ul>
        {persons.map(person =>
        <Show key={person.name} person={person} filter={newFilter} />
        )}
      </ul>
    </div>
  )
}

export default App