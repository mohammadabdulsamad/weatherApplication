import React from 'react'
import sIcon from '../../assets/images/sIcon.png'
export default function InputBox(props) {

  return (
    <>
      <div className='inputContainer'>
        <input 
         className='searcBar' 
         type="text" 
         placeholder='Search your city...' 
         onChange={(e) => props.setCity(e.target.value)}  
         onKeyDown={(e) => e.key === 'Enter' ? props.getData() : props.setCity('Delhi')} 
        />
        
        <button className='searchIcon'>
            <img src={sIcon} alt="" className='searchImg'/>
        </button>
      </div>
    </>
  )
}
