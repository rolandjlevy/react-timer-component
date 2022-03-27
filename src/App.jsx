import React from 'react';
import Countdown from './Countdown';

function App() {
  return (
    <article>
      <h1>Countdown to cut-off time</h1>
      <Countdown cutOffDate="2022-03-27T00:23:00" />
    </article>
  );
}

export default App;