import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

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

    if (foundPerson === undefined) {
      const newPerson = { name: newName, number: newNumber }

      personService.create(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))

          setMessage(`Added ${createdPerson.name}`)
          setIsError(false)
          setTimeout(() => {
            setMessage(null)}, 5000)

          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error)
          setMessage(error.response.data.error)
          setIsError(true)
          setTimeout(() => {
            setMessage(null)}, 5000)
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace old number
      with new one?`) === true) {
        const updatedPerson = {...foundPerson, number: newNumber}
        console.log(updatedPerson)
        personService.update(updatedPerson)
          .then(updatedPersonFromServer => {
            setPersons(persons.map(person => person.id !== updatedPersonFromServer.id ? person : updatedPerson))
            setNewName('')
            setNewNumber('')
            console.log(updatedPerson)

            setMessage(`Added ${updatedPerson.name}`)
            setIsError(false)
            setTimeout(() => {
              setMessage(null)}, 5000)

            }
            )
          .catch((error) => {
            setMessage(`Information of ${updatedPerson.name} has already been removed from server`)
            setIsError(true)
            setTimeout(() => {
              setMessage(null)}, 5000)
            console.log(error)
          }
          )
        // console.log(foundPerson.id);
      }
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

  const remove = (deletePerson) => {
    const removedPerson = persons.find(person => person.id === deletePerson.id)
    console.log(persons)

    if (window.confirm(`Delete ${removedPerson.name}`) === true) {
      personService.remove(deletePerson.id)
        .then(() => {
          const newPersons = persons.filter(person => person.id !== deletePerson.id)
          setPersons(newPersons)
        })
        .catch(error => console.log(error))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError}/>

      <Filter searchName={searchName} handleSearchChange={handleSearchChange} />

      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addName={addName} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} remove={remove} />
    </div>
  )
}

export default App