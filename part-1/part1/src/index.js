import React from 'react';
import ReactDom from 'react-dom';

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  const data = [
    {part: part1, exercises: exercises1},
    {part: part2, exercises: exercises2},
    {part: part3, exercises: exercises3}
  ];

  return (
    <div>
      <Header course={course} />
      <Content data={data} />
      <Total data={data} />
    </div>
  );
}

const Header = (props) => {
  return <h1>{props.course}</h1>;
}

const Content = (props) => {
  return props.data.map(item => {
    return (
      <p key={item.part}>
        {item.part} {item.exercises}
      </p>
    );
  });
}

const Total = (props) => {
  const sum = props.data
    .map(item => item.exercises)
    .reduce((sum, item) => {return sum + item });

  return(
    <p>Number of exercises {sum}</p>
  );
}

ReactDom.render(<App />, document.getElementById('root'));
