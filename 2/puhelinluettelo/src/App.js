import { useState } from 'react'

const Show = ({ person }) => {
  console.log('Show', person.name)
  return (
    <div>
      <li>{person.name} {person.number}</li>
    </div>
  )
}

const checkDuplicate = ( {newName, persons} ) => {
  console.log('checking for duplicates...')
  console.log('persons', persons)
  console.log('checking', newName)
  console.log(persons.includes(newName))

  const filteredList = persons.filter(person => person.name === newName)
  
  if (filteredList.length > 0) {
    console.log("was false")
    return false
  }
  console.log("was true")
  return true
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '+358 0 123456'}
  ]) 
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  const handleNameChange =(event) => {
    console.log('name change', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange =(event) => {
    console.log('number change', event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
        <Show key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App