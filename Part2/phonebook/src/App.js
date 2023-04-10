import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    console.log('use effect triggered')

    personService.getAll()
      .then(initialData => {
        setPersons(initialData)
      })
      .catch(error => console.log(error))

  }, [])

  const addName = (event) => {
    event.preventDefault()
    const foundPerson = persons.find(person => person.name === newName)

    if(foundPerson === undefined) {
      const newPerson = {name: newName, number: newNumber}

      personService.create(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => console.log(error))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }

  const personsToShow = persons.filter((person) => {
    const result = person.name.toLowerCase().includes(searchName.toLowerCase())
    return result
  })

  // const remove = (id) => {
  //   personService.remove(id)
  //       .then(response => console.log(response))
  //       .catch(error => console.log(error))
  // }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchChange={handleSearchChange}/>

      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber ={newNumber}
        handleNameChange = {handleNameChange}
        handleNumberChange = {handleNumberChange}
        addName = {addName}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App