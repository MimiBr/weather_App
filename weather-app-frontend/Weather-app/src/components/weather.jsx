import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getWeatherByCity } from '../service/weatherService';
import { useNavigate } from 'react-router-dom';
import {addCityToFavorites} from '../service/weatherService'
import './weather.css'; 

export default function Weather() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchWeather = async (cityToFetch) => {
        try {
            setWeather(null);
            setError(null);
            const data = await getWeatherByCity(cityToFetch);
            setWeather(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchAddToFavorites = async(city) =>{
        const token = localStorage.getItem('token')
        if(token){
            try {
                setError(null);
                const data = await addCityToFavorites(city);
                alert(data.message); 
            } catch (err) {
                setError(err.message);
            }
        }
        else{
            navigate('/login');
        }
    }

    


    useEffect(() => {
        fetchWeather('ירושלים');
    }, []);

    return (
        <div className="weather-container">
            <Box className="weather-box" component="form" noValidate autoComplete="off">
                <h2 className="weather-title">Weather Search</h2>
                <TextField
                    className="weather-field"
                    id="outlined-basic"
                    label="City"
                    variant="outlined"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <Button
                    className="weather-button"
                    variant="contained"
                    onClick={() => fetchWeather(city)}
                >
                    Get Weather
                </Button>
                <Button
                    className="weather-button"
                    variant="contained"
                    onClick={() => fetchAddToFavorites(city)}
                >
                    add to favorites
                </Button>
                {weather && (
                    <div className="weather-info">
                        <div>name: {weather.name}</div>
                        <div>Temperature: {weather.main.temp} °C</div>
                        <div>Description: {weather.weather[0].description}</div>
                    </div>
                )}
                {error && <div className="weather-error">Error: {error}</div>}
            </Box>
        </div>
    );
}