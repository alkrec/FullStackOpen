import countryService from './services/countries'
import { useState, useEffect } from 'react'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchedCountry, setSearchedCountry] = useState('')


  //
  // Summary: fetch initial country data
  useEffect(() => {
    countryService.getAll()
      .then((initialCountries) => {
        setCountries(initialCountries)
      })}, [])  


  //
  // Summary: handles the setting of the search term state
  const handleChange = (event) => {
    setSearchedCountry(event.target.value)
  }

  //
  // Summary: Set state of searched term when 'show' button is clicked
  const handleClick = (event) => {
    const countryName = event.target.value
    setSearchedCountry(countryName)
  }
  

  //
  // Summary: Filter the displayed list by the search term
  const countriesToDisplay = countries.filter(c => {
    const countryLowerCase = c.name.common.toLowerCase()
    const country = countryLowerCase.includes(searchedCountry.toLowerCase())
    return country
  })

  
  return (
    <div>
      find countries
      <input onChange={handleChange}/>
      <Countries 
        countriesToDisplay={countriesToDisplay}
        handleClick={handleClick}
      />  
    </div>
  );
}

export default App;
