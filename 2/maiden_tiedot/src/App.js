import { useState, useEffect } from 'react'
import axios from 'axios'

const Show = ({ toShow, searchKey}) => {
  if (searchKey.length === 0 || toShow.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  return (  
    <div>
      {toShow.map(country =>
        <ListCountries key={country.cca2} name={country.name}/> 
      )}
    </div>
  )
}

const ListCountries = ({name}) => {
  return (
    <div>
      <li>{name.common}</li>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchKey, setKey] = useState('')

  const hook = () => {
    console.log('effect')
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
      console.log('promise fulfilled')
    })
  }

  useEffect(hook, [])

  const handleChange = (event) => {
    console.log('name change', event.target.value)
    setKey(event.target.value)
  }

  const filterCountries = () => {
    console.log('filtering countries by', searchKey)
    const filtered =  countries.filter(country => country.name.common.includes(searchKey))
    console.log('countries that were filtered', filtered)

    return filtered
  }

  return(
    <div>
      <h2>Countries</h2>
        <div>name: <input
          value={searchKey}
          onChange={handleChange}
        /></div>
      <ul>
        <Show toShow={filterCountries()} searchKey={searchKey}/>
      </ul>
    </div>
  )

}

export default App