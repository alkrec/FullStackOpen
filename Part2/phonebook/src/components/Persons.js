const Persons = (props) => {
    const { personsToShow, remove } = props

    return (
        <div>
            {personsToShow.map(person => {
                return (
                    <p key={person.id}>
                        {person.name} {person.number}
                        <button onClick={() => remove(person)} >Delete</button>
                    </p>
                )
            })}
        </div>
    )
}

export default Persons