const Countries = (props) => {
    const {countriesToDisplay, handleClick} = props
  
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
                        <ul>
                          {Object.values(country.languages).map((value, index) => <li key={index}>{value}</li>)}
                        </ul>
                        <img src={country.flags.png} />
                    </div>
                )})
        )
    } else if (countriesToDisplay.length === 250) {  //No user input
      return <p>Enter a country</p>
    } else if (countriesToDisplay.length > 10) { // over 10 results
      return <p>Too many matches, specify another filter</p>
    } else { // under 10 results
      return countriesToDisplay.map(country => {
        return <div key={country.ccn3}>
          {country.name.common}
          <button onClick={handleClick} value={country.name.common}>show</button>
        </div>
        })
    }
  }

  export default Countries