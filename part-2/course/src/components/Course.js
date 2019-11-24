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
    <h2>{name}</h2>
  );
};

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/> 
    </div>
  );
}

export default Course;
