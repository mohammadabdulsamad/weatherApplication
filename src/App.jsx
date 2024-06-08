import { useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import InputBox from './components/inputBox/InputBox'
import LeftView from './components/leftView/LeftView'
import RightView from './components/rightview/RightView'

import './App.css'

function App() {

    const apiKey = "5b6d0b4dbbab8192f6db76fe4ab78ad8"; // Api key
    const [data, setData] = useState({}); //This "data" is for holding the response object(data) getting from API
    const [city,setCity] = useState('Delhi');  //This "City" variable is for to hold value from input box in it, and to paas this "City" variable's value in API call to get desired city data.
    const [cityNameFromApi,setCityNameFromApi] = useState('') //This for to hold city name getting from API
    const [weatherInfo, setWeatherInfo] = useState({});
    const [temp,setTemperature] = useState(0);  
    const [feel,setFeelTemperature] = useState(0);
    
    const mainData = data?.main;
    const sysData = data?.sys;
    const windData = data?.wind;

    //This Function is for Api Call according to city name
    const getData = ()=>{
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`) 
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json(); // parsing the data into object from json format
      })
      .then(data => {
          setData(data); // Handle the data from the response
      })
      .catch(error => { // Handling the error 
        setData(undefined); // setting Data to "undefined" if we have no data from API
        setFeelTemperature(undefined);
          toast.error("City Not Found !", { //This is to print error in ToastMessage structure
            position: toast?.POSITION?.TOP_RIGHT,
          });
        })
     };

    useEffect(getData,[]);
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

  // Function for formatting the time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const formattedTime = `${hours}:${minutes.slice(-2)}`;
    return formattedTime;
  };
  
  //Function to get Current time
  const getHours = (timestamp) =>{
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const hours = date.getHours();
    return hours;
  }
  
  return (
    <>
      <ToastContainer /> {/*This component getting from library to show error message */}
      <div className='container'>
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
           getData={getData}
           />
          <RightView 
           windSpeed = {windData?.speed} 
           humidity={mainData?.humidity} 
           feel={feel} 
           pressure={mainData?.pressure}
           groundLevel={mainData?.grnd_level}
           seaLevel={mainData?.sea_level}
           sunrise={data ? formatTime(sysData?.sunrise) : "-"}
           sunset={data ? formatTime(sysData?.sunset): "-"}
           longitude={data?.coord?.lon}
           latitude={data?.coord?.lat}
           />
        </div>
      </div>
    </>
  )
}

export default App
