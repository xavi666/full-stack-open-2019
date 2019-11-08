import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// a proper place to define a component
const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  const average = all > 0 ? (good * 1 + neutral * 0 + bad * -1) / all : 0;
  const positive = all > 0 ? good / all * 100 : 0;
  return (
    all === 0 ?
      'No feedback given'
    :
    <div>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={all} />
      <Statistic text="average" value={average} />
      <Statistic text="positive" value={positive} extraText="%"/>
    </div>
  );
}

const Statistic = ({text, value, extraText}) => {
  return <p>{text} {value} {extraText}</p>
}

const Button = ({children, onClick}) => {
  return <button onClick={onClick}>{children}</button>
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)}>good</Button>
      <Button onClick={() => setNeutral(neutral + 1)}>neutral</Button>
      <Button onClick={() => setBad(bad + 1)}>bad</Button>
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  );
}

ReactDOM.render(<App />,
  document.getElementById('root')
);
