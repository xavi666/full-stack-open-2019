import React from 'react';

const Total = ({ parts }) => {
  const sum = parts
    .reduce((sum, item) => { return sum + item.exercises }, 0);

  return (
    <p>
      <strong>total of {sum} exercises</strong>
    </p>
  );
}; 

const Part = ({ part }) => {
  return (
    <div>{part.name} {part.exercises}</div>
  );
};

const Content = ({ parts }) => {
  return parts.map(part => <Part key={part.id} part={part}/>);
};

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/> 
    </div>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App;
