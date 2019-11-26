import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/persons';
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(p => newName === p.name);
    const newPerson = {
      name: newName,
      number: newNumber
    };
    if (existingPerson) {
      window.confirm(`${newName} is already added to the phonebook, replace old number with a new one`);
      personService
        .update(existingPerson.id, newPerson)
        .then(response => {
          setMessage(
            `Updated ${existingPerson.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.map(p => p.id !== existingPerson.id ? p : response.data))
          setNewName('');
          setNewNumber('');
        });
      return;
    }
    personService
      .create(newPerson)
      .then(response => {
        setMessage(
          `Added ${newPerson.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.concat(response.data));
        setNewName('');
        setNewNumber('');
      })
  };

  const deletePerson = (person) => {
    window.confirm(`Delete ${person.name} ?`);
    personService.deletePerson(person.id)
      .then(response => {
        const newPersons = persons.filter(p => p.id !== person.id);
        setPersons(newPersons);
      });
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
        filter={filter}
        handleFilter={handleFilter}
      />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
