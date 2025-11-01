import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const[weatherData,setWeatherData]= useState(null)
  const[city,setCity]=useState('')
  const[loading,setLoading]= useState(false)
  const[error,setError]=useState(false)

  const apiKey='f7625f98e5a6482794145837250111'
  const apiUrl=`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`

  const Search=()=>{

    if(!city) return

    setLoading(true)
    setError(false)

    axios.get(apiUrl).then((res)=>{
      setWeatherData(res.data)
      setLoading(false)
    })
    .catch(()=>{
      
      alert("Failed to fetch weather data")
    })

  }


  return (

    <div className="app">
      <div className="search">
        <input type="text"
        value={city}
        onChange={(e)=> setCity(e.target.value)}
        placeholder="Enter city Name" />

        <button onClick={Search} style={{ backgroundColor: 'green', color: 'white' }}>Search</button>
      </div>

      {loading&& <p>Loading data...</p>}
      {error && !loading && <p>Failed to fetch weather data</p>}
      {weatherData&&!loading&&(
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph}kph</p>
          </div>
        </div>
      )}
    </div>
  

);
}

export default App;
