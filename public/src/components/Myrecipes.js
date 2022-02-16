import React,{useState,useEffect} from 'react';
import pic from '../pictures/icon_plus_white.svg';
import trashcan from '../pictures/icon_trashcan.svg';
import { Link } from 'react-router-dom';
import '../css/Myrecipes.css';
export const Myrecipes = () =>{

  const [recipes,setRecipes] = useState([]);    
  const token = localStorage.getItem("jwt"); 
    
  const getRecipe = async()=>{
    try {
      const res = await fetch("/api/v1/recipe/getmine",{
        method:"GET",
        headers:{
          "Content-type":"application/json",
          "Authorization":`Bearer ${token}`
        },        
      })
      let data = await res.json();      
      setRecipes(data);             
    } catch (error) {
      console.log(error);
    }
  }
  
  const removeRecipe = async(id)=>{
    try {
       await fetch(`/api/v1/recipe/remove/${id}`,{
        method:"DELETE",
        headers:{
          "Content-type":"application/json",
          "Authorization":`Bearer ${token}`
        },              
      })                            
    } catch (error) {
      console.log(error);
    }
  }
  const deleteRecipe = (_id)=>{
    setRecipes([...recipes.filter(recipe => recipe._id !== _id)]);
  }
  
  useEffect(()=>{   
    getRecipe()
  },[]);
 
  return (
   <div id='myrecipes'>     
     <div class='myrecipes-div1'>
       <h2 class='myrecipes-title'>My Recipes</h2>
       <div class='myrecipes-line'></div>
       <Link to='/addrecipe'><img src={pic} alt='pic' class='icon_plus_white'/></Link>
     </div> 
     <div id='table'>
       <div id='thead'>
         <h4>Recipe Name</h4>
         <h4>Category</h4>
         <h4>Created On</h4>
         <h4>Delete</h4>
       </div>
       <div id='tbody'>         
       {recipes.length > 0 && recipes.map((recipe,i)=>{
         let routeUrl = '/updaterecipe?id=' + recipe._id;
              return(                
                <div class='div-tr-h4' key={i}>
                  <Link to={routeUrl}> 
                  <div class='div-h4' id={recipe._id}>
                    <h4>{recipe.recipe_title}</h4>
                    <h4>{recipe.category}</h4>
                    <h4>{recipe.create_on}</h4>
                  </div>
                  </Link>                   
                  <img src={trashcan} class='icon-trashcan' alt='img' onClick={() => { removeRecipe(recipe._id); deleteRecipe(recipe._id) }} />                                                                
                </div>                               
              )
            })} 
       </div>
     </div>     
   </div>   
  )
}