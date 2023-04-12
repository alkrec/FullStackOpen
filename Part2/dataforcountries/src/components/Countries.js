const Countries = (props) => {
    const {countriesToDisplay} = props
  
    if (countriesToDisplay.length === 0) { //No match
      return <p>No matches</p>
    } else if (countriesToDisplay.length === 1) {  //one match
        return (
            countriesToDisplay.map(country => {
                return (
                    <div key={country.ccn3}>
                        <h2>{country.name.common}</h2>
                        <p>capital {country.capital}</p>
                        <p>area {country.area}</p>
                        <h3>languages</h3>
                        <p>{country.flags.png}</p>
                    </div>
                    )})
        )
    } else if (countriesToDisplay.length === 250) {  //No user input
      return <p>Enter a country</p>
    } else if (countriesToDisplay.length > 10) { // over 10 results
      return <p>Too many matches, specify another filter</p>
    } else { // under 10 results
      return countriesToDisplay.map(country => <p key={country.ccn3}>{country.name.common}</p>)
    }
  }
  export default Countries