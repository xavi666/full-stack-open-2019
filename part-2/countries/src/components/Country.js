import React from 'react';

const Country = ({country}) => {
  const renderDetails = () => {
    if (!country.details) return;
    return (
      <div>
        <h1>{country.details.name}</h1>
        <p>capital {country.details.capital}</p>
        <p>population {country.details.population}</p>
        <h2>languages</h2>
        <ul>
          {
            country.details.languages.map(language => {
              return (
                <li key={language.iso639_1}>
                  {language.name}
                </li>
              );
            })
          }
        </ul>
        <img src={country.details.flag} width='100' alt={country.details.flag}/>
      </div>
    );
  };

  const renderWeather = () => {
    if (!country.weather || !country.weather.location) return;
    return (
      <div>
        <h2>Weather in {country.weather.location.name}</h2>
        <div>
          <b>temperature:</b>
          {country.weather.current.temperature} Celsius
        </div>
        <div>
          {
            country.weather.current.weather_icons.map(icon => {
              return (
                <img key={icon} src={icon} alt={icon}/>
              );
            })
          }
        </div>
        <div>
          <b>wind:</b>
          {country.weather.current.wind_speed} kph direction {country.weather.current.wind_dir}
        </div>
      </div>
    );
  };

  return(
    <div>
      { renderDetails() }
      { renderWeather() }
    </div>
  );
};

export default Country;
