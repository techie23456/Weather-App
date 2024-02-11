import React,{useState,useEffect} from 'react'
import './Weather.css'
export default function Weather() {
    const [city, setCity] = useState('London');
    const [weather, setWeather] = useState(null);
  
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchWeather();
    }, []);
  
    const handleCityChange = (event) => {
      setCity(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      fetchWeather();
    };
  
    if (!weather) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="weather">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={handleCityChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h2>{weather.name}</h2>
        <p>{weather.weather[0].description}</p>
        <p>Temperature: {weather.main.temp}</p>
        <p>Feels Like: {weather.main.feels_like}</p>
        <p>Humidity: {weather.main.humidity}</p>
      </div>
    );
  };