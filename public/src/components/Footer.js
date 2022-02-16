import React from "react";
import baby from '../pictures/logo_white.svg';
import '../css/Footer.css';
export const Footer = ()=>{
  return (
    <div id='footer'>
     <div class='footer-elements'>
      <img src={baby} alt='picture' class='babypicture'/>
      <div class='meals'>
        <ul>            
          <li>BREAKFAST</li>
          <li>BRUNCH</li>
          <li>LUNCH</li>
          <li>DINNER</li>
        </ul>    
      </div>
      <span>Baby's Food Place <br/> copyright 2021</span>
     </div>
    </div>
  )  
}