import { useState,useEffect } from 'react'
import bgPic from './assets/images/bgPic.jpg'
import InputBox from './components/inputBox/InputBox'
import LeftView from './components/leftView/LeftView'
import './App.css'
import RightView from './components/rightview/RightView'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Function Dashboard background styling
function App() {
    const appStyle = {
      backgroundImage: `url(${bgPic})`,
      height: '100vh',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };

    // Api key
    const apiKey = "5b6d0b4dbbab8192f6db76fe4ab78ad8";

    const [data, setData] = useState({});
    const [city,setCity] = useState('Delhi');
    const [cityNameFromApi,setCityNameFromApi] = useState('') // to remove this useState
    const [weatherInfo, setWeatherInfo] = useState({});
    const [temp,setTemperature] = useState(0);
    const [feel,setFeelTemperature] = useState(0);

    const mainData = data?.main;
    const sysData = data?.sys;
    const windData = data?.wind;

    //Api Call according to city name
    useEffect(()=>{
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch(error => {
        return toast?.error("Network Issue !", {
          position: toast?.POSITION?.TOP_RIGHT,
        })
      })
     },[city]);

    //Converting Temperature kelvin into Celcius while checking if we Have weather data or not.
    useEffect(()=>{
      if(data?.weather)
        { 
          setWeatherInfo(data?.weather[0]);
          const tempInCelcius1 = mainData?.temp-273.15;
          const tempInCelcius2 = mainData?.feels_like - 273.15;
          setTemperature(tempInCelcius1.toFixed(1));
          setFeelTemperature(tempInCelcius2.toFixed(1));
        }
      setCityNameFromApi(data?.name);
    },[data?.weather]);

  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const formattedTime = `${hours}:${minutes.slice(-2)}`;
    return formattedTime;
  };

  const getHours = (timestamp) =>{
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const hours = date.getHours();
    return hours;
  }

  return (
    <>
      <ToastContainer />
      <div style={appStyle} className='container'>
        <div className='mainContainer'>
          <LeftView 
           setCity={setCity} 
           temp = {temp} 
           weatherDescription = {weatherInfo?.description}
           cityNameFromApi = {cityNameFromApi}
           country={sysData?.country}
           iconCode={weatherInfo?.id}
           sunrise={getHours(sysData?.sunrise)}
           sunset={getHours(sysData?.sunset)}
           />
          <RightView 
           windSpeed = {windData?.speed} 
           humidity={mainData?.humidity} 
           feel={feel} 
           pressure={mainData?.pressure}
           groundLevel={mainData?.grnd_level}
           seaLevel={mainData?.sea_level}
           sunrise={formatTime(sysData?.sunrise)}
           sunset={formatTime(sysData?.sunset)}
           longitude={data?.coord?.lon}
           latitude={data?.coord?.lat}
           />
        </div>
      </div>
    </>
  )
}

export default App
