import React from 'react';

const Persons = ({persons, filter, deletePerson}) => {

  const filterByName = persons.filter(person => {
    return person.name.toLowerCase().includes(filter.toLowerCase())
  });

  return filterByName.map(person => {
    return (
      <div key={person.id}>
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person)}>delete</button>
        </p>
      </div>
    );
  });
};

export default Persons;