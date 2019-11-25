import React from 'react';
import Country from '../components/Country';

const Countries = ({countries, filter}) => {
  if (countries.length > 10) return 'Too many matches, specify another filter';
  if (countries.length === 1) return <Country country={countries[0]}/>;
  return countries.map(country => {
    return <div key={country.name}>{country.name} {country.number}</div>;
  });
};

export default Countries;