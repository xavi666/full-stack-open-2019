import React from 'react';
import Country from '../components/Country';

const Countries = ({countries, selectedCountry, selectCountry}) => {
  if (countries.length > 10) return 'Too many matches, specify another filter';
  if (countries.length === 1) return <Country country={countries[0]}/>;
  return (
    <div>
      {countries.map(country => {
        return (
          <div key={country.name}>
            {country.name} {country.number}
            <button onClick={() => selectCountry(country)}>show</button>
          </div>
        );
      })}
      {selectedCountry &&
        <Country country={selectedCountry}/>
      }
    </div>
  );
};

export default Countries;