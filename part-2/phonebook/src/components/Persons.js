import React from 'react';

const Persons = ({persons, filter}) => {

  const filterByName = persons.filter(person => {
    return person.name.toLowerCase().includes(filter.toLowerCase())
  });

  return filterByName.map(person => {
    return <p key={person.name}>{person.name} {person.number}</p>;
  });
};

export default Persons;