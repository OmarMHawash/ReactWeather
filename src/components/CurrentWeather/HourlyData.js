import React, { useState, useEffect } from 'react';

const HourlyData = (props) => {

    return (
        <div className='hour-data'>
            <p>{props.data.time}</p>
            <img src={`/img/weather-icons/${props.data.img}.svg`} alt={props.data.img} />
            <p>{props.data.temp}° C</p>
        </div>
    )
}

export default HourlyData