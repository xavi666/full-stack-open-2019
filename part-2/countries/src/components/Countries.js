import React from 'react';
import Country from '../components/Country';

const Countries = ({countries, selectedCountry, selectCountry}) => {
  if (countries.length > 10) return 'Too many matches, specify another filter';
  if (countries.length === 1 && !selectedCountry.details) {
    selectCountry(countries[0]);
  }
  return (
    <div>
      {
        countries.length > 1 &&
        countries.map(country => {
          return (
            <div key={country.name}>
              {country.name} {country.number}
              <button onClick={() => selectCountry(country)}>show</button>
            </div>
          );
        })
      }
      {
        selectedCountry.details &&
        <Country country={selectedCountry}/>
      }
    </div>
  );
};

export default Countries;
