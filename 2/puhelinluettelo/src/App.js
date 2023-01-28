import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Show = ({ person, filter, deletePerson }) => {
  console.log(`person id is ${person.id} and name is ${person.name} and number is ${person.number}`)
  if (filter === '' || filterPerson({person, filter})) {
    return (
        <li>
          {person.name}
          {person.number}
          <button onClick={deletePerson}>Delete</button>
        </li>
    )
  }
  console.log('name not shown')
  
}

const checkDuplicate = ( {newName, persons} ) => {
  const filteredList = persons.filter(person => person.name === newName)
  
  if (filteredList.length > 0) {
    return false
  }
  return true
}

const filterPerson = ( {person, filter} ) => {
  const name = person.name.toLowerCase()
  const filterString = filter.toLowerCase()

  return (
    name.includes(filterString)
  )
}

const Notification = ({message, messageType}) => {
  console.log("message type is", messageType)
  if (message === null) {
    return null
  }
  if (messageType) {
    return (
      <div className='success'>
        {message}
      </div>
    )    
  }
    return (
      <div className='error'>
        {message}
      </div>
    )

}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [currentMessage, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(true)

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
          setMessage(
            `${newName} was successfully added to the phonebook`
          )
          setMessageType(true)
          setTimeout(() => {
            setMessage(null)
          }, 5000);
          setNewName('')
          setNewNumber('')
        })
    } else {
      if (window.confirm(`are you sure you want to update number for ${newName}`)) {
        const updateId = persons.find(person => person.name === newName)
        const updatedPerson = {...updateId, number: newNumber}

        personService
          .update(updateId.id, updatedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== newName.id ? person : returnedPerson))
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              setMessage(
                `Information of ${newName} has already been removed from server`
              )
              setMessageType(false)
              setTimeout(() => {
                setMessage(null)
              }, 5000);
            })
      }
    }
  }

  const deletePerson = (id) => {
    console.log(`Attempting to delete ${id}`)
    if (window.confirm(`Are you sure?`)) {
      personService
        .remove(id)
          .then(response => {
            setPersons(persons.filter(person => person.id !== id ))
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
      <Notification message={currentMessage} messageType={messageType}/> 
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