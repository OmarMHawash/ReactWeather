import React, { useState, useEffect } from 'react';

const Header = (props) => {
    const [city, setCity] = useState('');

    const findWeather = () => {
        props.cityName(city);
    }
    return (
        <div className='header'>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='Type a city name' />
            <button onClick={findWeather}>FIND WEATHER</button>
        </div>
    )
}

export default Header