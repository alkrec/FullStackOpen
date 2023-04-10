import personService from '../services/persons'

const Persons = (props) => {
    const {personsToShow} = props

    const remove = (id) => {
        personService.remove(id)
            .then((response) => {
                console.log(response)
            })
            .catch(error => console.log(error))
        
    }

    return (
        <div>
            {personsToShow.map(person => {
                return (
                        <p key={person.id}> 
                            {person.name} {person.number}
                            <button onClick={() => remove(person.id)}>Delete</button>
                        </p>
                )
            })}
        </div>
    )
}

export default Persons