import React,{useEffect, useState} from 'react';
import { Link  } from 'react-router-dom';
import pic from '../pictures/macbacon.png';
import pic3 from '../pictures/icon_back_white.svg';
import '../css/Addrecipe.css';

export const Updaterecipe = () =>{ 
  const articlesInit= {
    recipe_title:'',
    category:'',
    preparation_time:'',
    no_people:'',
    short_description:'',
    recipe:'',
    likes:0,       
    usersLikes:[]    
  }

  const [articlesData, setArticlesData] = useState(articlesInit);   
  const token = localStorage.getItem('jwt');
  const [image,setImage]=useState();  
  let params = new URLSearchParams(document.location.search);
  let recid = params.get("id");

  const getRecipe = async()=>{
    try {
      const res = await fetch(`/api/v1/recipe/getone/${recid}`,{
        method:"GET",
        headers:{
          "Content-type":"application/json",
          "Authorization":`Bearer ${token}`
        },        
      })
      let data = await res.json();  
      console.log(data);    
      setArticlesData(data);                     
    } catch (error) {
      console.log(error);
    }
  }  

  const updateInput = (e) => {
    setArticlesData({ ...articlesData, [e.target.name]: e.target.value });
  };
  const updateRecipe = async()=>{
    try {
      const res = await fetch(`/api/v1/recipe/update/${recid}`,{
        method:"PATCH",
        headers:{
          "Content-type":"application/json",
          "Authorization":`Bearer ${token}`
        },    
        body: JSON.stringify(articlesData) 
      })
      console.log(res);            
    } catch (error) {
      console.log(error);
      }}  
 
 
  useEffect(()=>{   
    getRecipe();
  },[])
 
  return (
    <div id='addrecipe'>     
     <div class='container1'>
       <h1 class='addrecipe-title'>Up Recipe</h1>
       <div class='line'></div>
     <Link to='/myrecipes'><img src={pic3} alt='pic3' class='pic3'/></Link>
     </div>     
     <div class='main-container'>
       <div>
        <h4 class='recipe-image'>Recipe Image</h4>
        <img src={image ? URL.createObjectURL(image) : pic} alt='picture' class='addrecipe-pic'/>
        <br/>
        <input  id='upload' type="file" onChange={(e)=>{
          setImage(e.target.files[0])
        }}/>       
       </div>           
          <div>
            <div class='div1'>
              <h4 class='recipe-title'>Recipe Title</h4>
              <input type='text' name="recipe_title" placeholder='meal-name' class='input' value={articlesData.recipe_title} onChange={updateInput}/>
            </div>                
            <div class='category'>
              <div class='div2'>
               <h4 class='addrecipe-category'>Category</h4>
               <select class='input1' name="category" type='text' value={articlesData.category} onChange={updateInput}>
                   <option></option>
                   <option value='breakfast'>breakfast</option>
                   <option value='brunch'>brunch</option>
                   <option value='lunch'>lunch</option>              
                   <option value='dinner'>dinner</option>
               </select>
               {/* <input class='input1' name="category" type='text' value={articlesData.category} onChange={updateInput}/> */}
              </div>
              <div class='div3'>
               <h4 class='preparation-time'>Preparation Time</h4>
               <input class='input2' name='preparation_time' type='text' value={articlesData.preparation_time} onChange={updateInput}/>
              </div>
              <div class='div4'>
               <h4 class='no-people'>No.People</h4>
               <input class='input3' name='no_people' type='number' value={articlesData.no_people} onChange={updateInput}/>
              </div>           
            </div>
            <div class='div5'>
              <h4 class='short-description'>Short Description</h4>
              <textarea class='textarea1' name='short_description' rows={5} value={articlesData.short_description} onChange={updateInput}></textarea>
            </div>                      
          </div> 
          <div class='div6'>
            <h4 class='recipe'>Recipe</h4>
            <textarea class='textarea2' name='recipe' rows={5} value={articlesData.recipe} onChange={updateInput}></textarea>
          </div>                 
     </div>
     <button class='save' onClick={updateRecipe}>SAVE</button> 
    </div>
  )
}


