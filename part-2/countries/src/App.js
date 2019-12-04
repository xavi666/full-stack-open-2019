import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';
import { weatherAccessKey } from './api_keys/api_keys';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({details: null, weather: null});

  const handleFilter = (event) => {
    setSelectedCountry({details: null, weather: null});
    setFilter(event.target.value);
  };

  const selectCountry = (country) => {
    setSelectedCountry({...selectedCountry, details: country});
  }

  const filterByName = countries.filter(country => {
    return country.name.toLowerCase().includes(filter.toLowerCase())
  });

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const getCountryWeather = (location) => {
      axios
        .get(`http://api.weatherstack.com/current?access_key=${weatherAccessKey}&query=${location}`)
        .then(response => {
          setSelectedCountry({...selectedCountry, weather: response.data});
        })
        .catch(error => {
          console.log(error);
        });
    };

    if (selectedCountry.details && !selectedCountry.weather) {
      getCountryWeather(selectedCountry.details.capital);
    }
  }, [selectedCountry]); // Only re-run the effect if selectedCountry changes

  return (
    <div>
      <Filter
        filter={filter}
        handleFilter={handleFilter}
      />
      <Countries
        countries={filterByName}
        filter={filter}
        selectedCountry={selectedCountry}
        selectCountry={selectCountry}
      />
    </div>
  );
};

export default App;
