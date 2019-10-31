import React from 'react';
import ReactDom from 'react-dom';

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
}

const Header = (props) => {
  return <h1>{props.course}</h1>;
}

const Content = (props) => {
  return props.parts.map(part => {
    return (
      <div key={part.name}>
        <Part part={part}/>
      </div>
    );
  });
}

const Part = (props) => {
  return (
    <p key={props.part.name}>
      {props.part.name} {props.part.exercises}
    </p>
  );
}

const Total = (props) => {
  const sum = props.parts
    .map(item => item.exercises)
    .reduce((sum, item) => {return sum + item });

  return(
    <p>Number of exercises {sum}</p>
  );
}

ReactDom.render(<App />, document.getElementById('root'));
