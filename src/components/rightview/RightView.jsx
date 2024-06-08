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
            <span className='today'>Today</span>
        </div>
        <div className="cardContainer">
            <Card cardHeading={"Wind"} cardDescription={props.windSpeed} descriptionUnit={"Km/h"}/>
            <Card cardHeading={"Humidity"} cardDescription={props.humidity} descriptionUnit={"%"}/>
            <Card cardHeading={"Real Feel"} cardDescription={props.feel} descriptionUnit={"°C"}/>
            <Card cardHeading={"Ground Level"} cardDescription={props.groundLevel} descriptionUnit={"hPa"}/>
            <Card cardHeading={"Pressure"} cardDescription={props.pressure} descriptionUnit={"mb"}/>
            <Card cardHeading={"Sea Level"} cardDescription={props.seaLevel} descriptionUnit={"hPa"}/>
            <Card cardHeading={"Coordinates"} cardDescription={props.windSpeed ? longitude : "-"} cardFooter={props.windSpeed ? latitude : "-"}/>
            <Card cardHeading={"Sun Rise"} cardDescription={props.sunrise} descriptionUnit={props.sunrise === "-" ? "" : "AM"}/>
            <Card cardHeading={"Sun Set"} cardDescription={props.sunset} descriptionUnit={props.sunset === "-" ? "" : "PM"}/>
        </div>
      </div>
    </>
  )
}
