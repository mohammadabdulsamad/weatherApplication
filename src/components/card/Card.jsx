import React from 'react'

export default function Card(props) {
  return (
    <>
      <div className="card">
        <p className='cardHeading'>{props.cardHeading}</p>
        <p className='cardInfo'>{props.cardDescription ? props.cardDescription : "-"} {props.cardDescription && props.descriptionUnit ? props.descriptionUnit:""}</p>
        <p className='cardDisc'>{props.cardFooter ? props.cardFooter : ""}</p>
      </div>
    </>
  )
}
