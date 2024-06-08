import React from 'react'

import InputBox from '../inputBox/InputBox.jsx'
import Index from '../index.js';
import Button from '../button/Button.jsx';

export default function LeftView(props) {

    const currentDay = new Date();
    const date = currentDay.toLocaleDateString();
    const time = currentDay.toLocaleTimeString();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[currentDay.getDay()];

    const isDay = currentDay.getHours() > props.sunrise && currentDay.getHours() < props.sunset; //Variable to store Day mode 

    // This function is for to get weather icon according to  weather
    const getIcon = (isday,id) =>{
        if(isday && id >= 200 && id < 300) return Index.dThunderstorm;
        else if(isday && id >= 300 && id < 500) return Index.dDrizzle;
        else if(isday && id >= 500 && id < 600) return Index.dRain;
        else if(isday && id >= 600 && id < 700) return Index.dSnow;
        else if(isday && id >= 700 && id < 800) return Index.dHaze;
        else if(isday && id === 800) return Index.dClear;
        else if(isday && id > 800) return Index.dCloud;
        else if(!isday && id >= 200 && id < 300) return Index.nThunderstorm;
        else if(!isday && id >= 300 && id < 500) return Index.nDrizzle;
        else if(!isday && id >= 500 && id < 600) return Index.nRain;
        else if(!isday && id >= 600 && id < 700) return Index.nSnow;
        else if(!isday && id >= 700 && id < 800) return Index.nAtmosphere;
        else if(!isday && id === 800) return Index.nClear;
        else if(!isday && id > 800) return Index.nCloud;
    }

  return (
     <>
       <div className='leftContainer'>
           <InputBox setCity = {props.setCity}getData={props.getData}/> 
           <Button text={"Search"} getData={props.getData}/>

           {props.country ?
           <>
              <div className='leftDataContainer'>
              <div className='iconContainer'>
                <img className='pic' src={getIcon(isDay,props.iconCode)} alt="" />
              </div>
              <div className='tempContainer'>
                  <p className='temp'>{props.temp}°C</p>
                  <p className='desc'>{props.weatherDescription}</p>
              </div>

              <div className='dayContainer'>
                  <p className='date'>{date}</p>
                  <p className='day'>{day}, {time}</p>
                  <p className='shift'>{isDay ? "Day" : "Night"}</p>
              </div>
              <p className='location'>{props.cityNameFromApi}, {props.country}</p>
              </div>
           </> 
            : 
           <>
             <img className='errorImage' src={Index.errorImage} alt="" />
           </>
           }

       </div>
     </>
  )
}



