import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const filterByName = countries.filter(country => {
    return country.name.toLowerCase().includes(filter.toLowerCase())
  });

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, []);

  return (
    <div>
      <Filter 
        filter={filter}
        handleFilter={handleFilter}
      />
      <Countries 
        countries={filterByName} 
        filter={filter}
      />
    </div>
  );
};

export default App;