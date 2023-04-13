import countryService from './services/countries'
import weatherService from './services/weather'
import { useState, useEffect } from 'react'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  //
  // Summary: fetch initial country data
  useEffect(() => {
    countryService.getAll()
      .then((initialCountries) => {
        setCountries(initialCountries)
      })}, [])
  
  //
  // Summary: fetch weather data of single country
  useEffect(() => {
    if(selectedCountry) {
      const lat = selectedCountry.capitalInfo.latlng[0]
      const lon = selectedCountry.capitalInfo.latlng[1]
      
      weatherService
        .getWeather(lat, lon)
        .then(weatherData => setWeatherData(weatherData))
    }
  }, [selectedCountry])
  

  //
  // Summary: handles the setting of the search term state
  const handleChange = (event) => {
    const inputtedValue = event.target.value

    //Gather matching countries based on search input
    const matchingCountries = countries.filter(c => {
      const countryLowerCase = c.name.common.toLowerCase()
      const matchedCountry = countryLowerCase.includes(inputtedValue.toLowerCase())
      return matchedCountry
    })
    
    //set state of filtered countries based on search input
    setFilteredCountries(matchingCountries)

    //if only one country is returned based on search input, set state of selected country
    if(matchingCountries.length === 1) {
      setSelectedCountry(matchingCountries[0])
    } else {
      setSelectedCountry(null)
    }
    
    //if no user input, set filtered countries to null
    if(event.target.value === '') {
      setFilteredCountries(null)
    }
  }


  //
  // Summary: Set state of searched term when 'show' button is clicked
  const handleClick = (event) => {
    const countryName = event.target.value
    console.log(countryName)
    const foundCountry = countries.find(c=> c.name.common === countryName)
    setSelectedCountry(foundCountry)
  }


  return (
    <div>
      find countries
      <input onChange={handleChange}/>
      <Countries 
        countriesToDisplay={filteredCountries}
        handleClick={handleClick}
        weatherData={weatherData}
        selectedCountry={selectedCountry}
      />  
    </div>
  );
}

export default App;
