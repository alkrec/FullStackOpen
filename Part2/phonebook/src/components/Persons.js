const Persons = (props) => {
    const {personsToShow} = props

    return (
        <div>
            {personsToShow.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
        </div>
    )
}

export default Persons