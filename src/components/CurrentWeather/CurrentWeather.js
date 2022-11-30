import React, { useState, useEffect } from 'react';
import HourlyData from './HourlyData';
import axios from 'axios';

const API_KEY = "459afe9373d3cd5b05f0fced596c6226";

const CurrentWeather = (props) => {
    const [city, setCity] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [todayWeather, settodayWeather] = useState([]);
    const [coords, setCoords] = useState({});
    const [hourlyDataArr, sethourlyDataArr] = useState([]);

    useEffect(() => {
        setCity(props.cityName);
    }, [props.cityName])

    useEffect(() => {
        (city !== "") && axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=8&units=metric&appid=${API_KEY}`)
            .then(res => {
                settodayWeather(res.data.list[0]);
                setCoords(res.data.city.coord);
            }).catch(err => {
                console.error(err);
            })
    }, [city])

    useEffect(() => {
        (city !== "") && axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&cnt=8&units=metric&appid=${API_KEY}`)
            .then(res => {
                sethourlyDataArr((res.data.list).slice(1, 8).map(item => {
                    return {
                        temp: Math.floor(item.main.temp),
                        img: getWeatherSVG(item.weather[0].id),
                        time: (item.dt_txt).slice(11, 16)
                    }
                }));
            }
            ).catch(err => console.error(err))
    }, [todayWeather])

    useEffect(() => {
        (hourlyDataArr.length > 0) && setLoaded(true);
    }, [hourlyDataArr])

    const getWeatherSVG = (id) => {
        let svg = '';
        (id > 801 && id < 805) ? svg = 'mostlycloudy' : id === 801 ? svg = 'partlycloudy' : id === 800 ? svg = 'clear' : id > 700 ? svg = 'fog' : id > 600 ? svg = 'snow' : id > 500 ? svg = 'rain' : id > 300 ? svg = 'drizzle' : id < 200 ? svg = 'storm' : svg = 'clear';
        return svg;
    }

    return (
        <div className='main-content'>
            {loaded && <>
                <div className='heading'>
                    <img src={`/img/weather-icons/${getWeatherSVG(todayWeather.weather[0].id)}.svg`} alt={todayWeather.weather[0].description} />
                    <h2>{todayWeather.weather[0].description}</h2>
                    <h3><span>Tempreature</span> {Math.floor(todayWeather.main.feels_like)}° to {Math.floor(todayWeather.main.temp)}° C</h3>
                    <div className='flex-text'>
                        <p>
                            <span>Humidity</span>
                        </p>
                        <p>
                            {todayWeather.main.humidity}%
                        </p>
                        <p>
                            <span>Pressure</span>
                        </p>
                        <p>
                            {todayWeather.main.pressure}
                        </p>
                    </div>
                </div>
                <div className='weather-hourly-data'>
                    {loaded && hourlyDataArr.map((item, index) => {
                        return <HourlyData key={index} data={item} />
                    })}
                </div>
            </>}
        </div>
    )
}

export default CurrentWeather;