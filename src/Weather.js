import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');  
    const [weather,setWeather]=useState();

    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    const fetchWeather = async (city) => {
        if (!city) {
            console.error('City name is required');
            return;
        }

        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fdc393bd6585165b95d96442534a13be&units=metric`);
            console.log(response.data); 
            setWeather(response);
        } catch (error) {
            console.error('Error fetching weather data:', error.message);  // Handle errors
        }
    }

    const handleClick = () => {
        fetchWeather(city);  // Pass the city to the fetchWeather function
    }

    return (
        <>
        <div className="heading">
           Know the weather!!
         </div>
            <div className='weather_container'>
                <input 
                    type="text" 
                    placeholder='Enter City name' 
                    value={city} 
                    onChange={handleCityChange} 
                />
                <br />
                <button onClick={handleClick}>Get Weather</button>
                {weather && <>
                <div >
                    <h3>{weather.data.name}</h3>
                    <p>Temp:{weather.data.main.temp}</p>
                    <p>{weather.data.weather[0].description} </p>
                </div>
                </>}
            </div>
        </>
    );
}

export { Weather };
