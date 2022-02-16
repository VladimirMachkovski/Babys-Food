import React,{useState,useEffect} from 'react'

import pic1 from '../../pictures/icon_star.svg';
import pic2 from '../../pictures/icon_time.svg';
import pic3 from '../../pictures/icon_plate.svg';
import pic4 from '../../pictures/icon_close.svg';
import pic5 from '../../pictures/macbacon.png';
import '../../css/Popup.css';
export const Popup = (props)=>{
console.log(props)
  const articles= {
    recipe_title: '',
    category: '',
    preparation_time: '',
    no_people: '',
    short_description: '',
    recipe: '',
    likes:0
    
  }

  const [articlesData, setArticlesData] = useState(articles);    
  const token = localStorage.getItem("jwt");   
  let params = new URLSearchParams(document.location.search);
  let popid = params.get("id");
  
  
  const getRecipe = async()=>{
   
    try {
      const res = await fetch(`/api/v1/recipe/getone/${popid}`,{
        method:"GET",
        headers:{
          "Content-type":"application/json",
          "Authorization":`Bearer ${token}`
        },        
      })
      let data = await res.json();  
         console.log(data)
      setArticlesData(data);             
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{   
    getRecipe()
  },[]);
  return(
    <div id='popup-main'>    
      <div id='popup-div' >
      <div class='div-popup-title'>
        <h2 class='popup-title'>{articlesData.recipe_title}</h2>
        <img src={pic4} alt='pic4' class='icon_close' onClick={props.handleClose}/>
        {props.content}
      </div>
      <div class ='div-img-text'>
        <div class='div1-img1-text1'>
          <img src={pic5} alt='pic5' class='popup-img'/>
          <div class='div-under-pic'>
            <h4 class='best'>Best Served For</h4>
            <h4 class='popup-meal'>{articlesData.category}</h4>
          </div>
          <p class='popup-min-par'>{articlesData.short_description}</p>
          <div class='articles'>
            <img src={pic2} alt='pic2' class='popup-pic2'/>
            <p class='pop-preparation-time'>{articlesData.preparation_time}</p>
            <img src={pic3} alt='pic3' class='popup-pic3'/>
            <p class='pop-no-people'>{articlesData.no_people}persons</p>
            <img src={pic1} alt='pic1' class='popup-pic1'/>
            <p class='popup-likes'>{articlesData.likes}</p>
          </div>
        </div>
        <div class='div2-img2-text2'>
          <h4 class='recipe-details'>Recipe Details</h4>
          <p class='popup-max-par'>{articlesData.recipe}</p>
        </div>
      </div>      
    </div>       
    </div>
  )
}
