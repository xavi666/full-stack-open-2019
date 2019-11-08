import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// a proper place to define a component
const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  const average = all > 0 ? (good * 1 + neutral * 0 + bad * -1) / all : 0;
  const positive = all > 0 ? good / all * 100 : 0;
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  );
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
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
