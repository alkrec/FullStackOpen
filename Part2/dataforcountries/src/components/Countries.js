const Countries = (props) => {
    const {countriesToDisplay, handleClick, weatherData, selectedCountry} = props

    //if there is a single selected Country that has weather data, return all info
    if(selectedCountry && weatherData) {
      return (
        <div key={selectedCountry.ccn3}>
            <h2>{selectedCountry.name.common}</h2>
            <p>capital {selectedCountry.capital}</p>
            <p>area {selectedCountry.area}</p>
            <h3>languages</h3>
            <ul>
              {Object.values(selectedCountry.languages).map((value, index) => <li key={index}>{value}</li>)}
            </ul>
            <img src={selectedCountry.flags.png} />
            <h2>Weather in {selectedCountry.capital}</h2>
            <p>temperature {weatherData.main.temp}</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}/>
            <p>wind {weatherData.wind.speed} m/s</p>
        </div>
        )
    }
  
    if (!countriesToDisplay) { //No user input
      return <p>Enter a country</p>      
    } else if (countriesToDisplay.length === 0) {  //No match
      return <p>No matches</p>
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