import { useEffect, useState } from 'react'
import weather from '../services/weather'

const Countries = (props) => {
    const {countriesToDisplay, handleClick, weatherData, selectedCountry} = props
    // const [country, setCountry]
    // console.log(countriesToDisplay.length)
    console.log('country', selectedCountry)
    console.log('weather', weatherData)

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
  
    if (countriesToDisplay.length === 0) { //No match
      return <p>No matches</p>
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