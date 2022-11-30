import React, { useState, useEffect } from 'react';

import Header from './components/Header/Header';
import './App.scss';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
function App() {
  const [city, setCity] = useState('');
  const cityHandler = (city) => {
    setCity(city);
  }

  return (
    <div className="app">

      <header className="app__header">
        <Header cityName={cityHandler} />
      </header>

      <main className="app__main">
        <CurrentWeather cityName={city} />
      </main>

    </div>
  );
}


export default App;
