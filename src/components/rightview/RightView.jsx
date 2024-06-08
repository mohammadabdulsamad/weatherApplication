import React from 'react'
import Card from '../card/Card'
import Button from '../button/Button'

export default function RightView(props) {
    const btnText1 = "Today";
    const longitude = "Long = " + props.longitude;
    const latitude = "Lat = " + props.latitude;
  return (
    <>
      <div className='rightContainer'>
        <div className='btnContainer'>
            <Button text = {btnText1}/>
        </div>
        <div className="cardContainer">
            <Card cardHeading={"Wind"} cardDescription={props.windSpeed} descriptionUnit={"Km/h"}/>
            <Card cardHeading={"Humidity"} cardDescription={props.humidity} descriptionUnit={"%"}/>
            <Card cardHeading={"Real Feel"} cardDescription={props.feel} descriptionUnit={"°C"}/>
            <Card cardHeading={"Ground Level"} cardDescription={props.groundLevel} descriptionUnit={"hPa"}/>
            <Card cardHeading={"Pressure"} cardDescription={props.pressure} descriptionUnit={"mb"}/>
            <Card cardHeading={"Sea Level"} cardDescription={props.seaLevel} descriptionUnit={"hPa"}/>
            <Card cardHeading={"Coordinates"} cardDescription={longitude} cardFooter={latitude}/>
            <Card cardHeading={"Sun Rise"} cardDescription={props.sunrise} descriptionUnit={"AM"}/>
            <Card cardHeading={"Sun Set"} cardDescription={props.sunset} descriptionUnit={"PM"}/>
        </div>
      </div>
    </>
  )
}
