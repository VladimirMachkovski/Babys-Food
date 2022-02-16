import React,{useState,useEffect} from 'react';
import macbacon from '../../pictures/macbacon.png';
import pic1 from '../../pictures/icon_star.svg';
import pic2 from '../../pictures/icon_time.svg';
import pic3 from '../../pictures/icon_plate.svg';
import pic4 from '../../pictures/icon_arrows_white.svg';
import {Link} from 'react-router-dom';
import '../../css/Main.css';

export const Breakfast = () => { 
 
  const [recipes,setRecipes] = useState([]);  
  const token = localStorage.getItem("jwt"); 
  const[isOpen,setIsOpen]=useState(false);
    const getRecipesByCat = async()=>{   
    try {
      const res = await fetch("/api/v1/recipe/category/breakfast")
      let data = await res.json();    
      console.log(data)  
      setRecipes(data);             
    } catch (error) {
      console.log(error);
    }
  };

  const getRecipe = async(id)=>{
    try {
      const res = await fetch(`/api/v1/recipe/getone/${id}`,{
        method:"GET",
        headers:{
          "Content-type":"application/json",
          "Authorization":`Bearer ${token}`
        },        
      })
      let data = await res.json();  
      return data;                          
    } catch (error) {
      console.log(error);
    }
  };
 
  const saveLikes = async (id,recipe) => {      
    try {
    recipe.likes +=1;
        let res = await fetch(
          `http://localhost:7000/api/v1/recipe/update/${id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-type': 'application/json',
              "Authorization":`Bearer ${token}`
            },        
            body: JSON.stringify(recipe)    
          }
        );
        console.log(res); 
        return true;           
    } catch (err) {
      console.log(err.message);
    }
  };   
  
  const handleClick = async (event) => {             
    let numberlikes = document.getElementById(event.target.id).nextSibling.innerHTML;     
    let parsedlikes= parseInt(numberlikes);
    parsedlikes += 1; 
    let recipe = await getRecipe(event.target.id);
    let result = await saveLikes(event.target.id, recipe);
    if(result){
       document.getElementById(event.target.id).nextSibling.innerHTML = parsedlikes;
     }
  }; 
  const togglePopup =()=>{
    setIsOpen(!isOpen)
  }
  useEffect(()=>{    
    getRecipesByCat()
  },[]);

    return(
        <div id='main'>            
        <div class='meals-div'>
          <h2 class='meals-name'>Breakfast</h2>
          <div class='breakfast-line'></div>
          </div>
          <div id='breakfast-container-one' >            
            { recipes.sort((min,max)=>{return max.likes - min.likes}).map((recipe,i)=>{  
              let recipeUrl = '/popup?id=' + recipe._id;                             
              return (
              <div id='meal-container'  key={i}> 
              <Link to={recipeUrl} >                  
                  <div class='breakfast-img'  >                    
                    <img src={macbacon} alt='macbacon' id='img' class='breakfast-img' />  
                    <h4 class='h4-breakfast-category'>{recipe.category}</h4>                                    
                  </div> 
                  </Link>                               
                  <div id='meal-description' class='breakfast-text'>
                    <h1 class='breakfast-meal-name'>{recipe.recipe_title}</h1>
                    <p  class='breakfast-paragraph'>{recipe.short_description}</p><br/>
                    <div class='breakfast-articles-container'>
                      <div class='breakfast-articles'>
                      <img src={pic2} alt='pic2' class='breakfast-pic2'/>
                      <p class='p-preparation-time'>{recipe.preparation_time}</p>
                      <img src={pic3} alt='pic3' class='breakfast-pic3'/>
                      <p class='p-no-people'>{recipe.no_people}persons</p>
                      <img src={pic1} alt='pic1' class='breakfast-pic1' id={recipe._id} onClick={handleClick} />
                      <p class='breakfast-likes' id="likescounter">{recipe.likes}</p>
                      </div>                      
                      <div class='div-pic4'><img src={pic4} alt='pic4' class='breakfast-pic4'/></div>
                    </div>
                  </div>
                </div> 
              )
            })}         
            </div>                        
      </div>
    ) 
    
}