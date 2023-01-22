import { useState, useEffect } from 'react'
import personService from './services/persons'

const Show = ({ person, filter, deletePerson }) => {
  console.log(`person id is ${person.id}`)
  if (filter === '' || filterPerson({person, filter})) {
    return (
        <li>
          {person.name} 
          {person.number}
          <button onClick={deletePerson}>Delete</button>
        </li>
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
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
        console.log('promise fulfilled')
    })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('adding person', newName, newNumber)
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (checkDuplicate({newName, persons})) {
      personService
        .create(personObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          console.log('name added')
          console.log({persons})
        })
    } else {
      return window.alert(`${newName} already exists in phonebook`)
    }
  }

  const deletePerson = (id) => {
    console.log(`Attempting to delete ${id}`)
    const newPersonList = persons.filter(person => person.id !== id )
    console.log('new person list is', {newPersonList})
    console.log('old person list is', {persons})


    if (window.confirm(`Are you sure?`)) {
      personService
        .remove(id)
          .then(response => {
            setPersons(newPersonList)
            console.log(`removed ${id}`)
          })
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
          <Show 
            key={person.id} 
            person={person} 
            filter={newFilter} 
            deletePerson={() => deletePerson(person.id)}
          />
        )}
      </ul>
    </div>
  )
}

export default App