import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import pic from '../pictures/macbacon.png';
import pic3 from '../pictures/icon_back_white.svg';
import '../css/Addrecipe.css';

export const Addrecipe = () =>{ 
  const articles= {
    recipe_title: '',
    category: '',
    preparation_time: '',
    no_people: '',
    short_description: '',
    recipe: '',
    likes:0,
    image:''
  }
  const [articlesData, setArticlesData] = useState(articles);
  const [image,setImage] = useState();
  
  const articleCreate = (e) => {
    setArticlesData({ ...articlesData, [e.target.name]: e.target.value });
  }
  
  const token = localStorage.getItem("jwt");

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
      console.log(data);    
      setArticlesData(data);                     
    } catch (error) {
      console.log(error);
    }
  }  

  const uploadImg = async (e)=>{     
          setImage(e.target.files[0])          
          const formData = new FormData();
          formData.append(
            "document",
            e.target.files[0],
            e.target.files[0].name
          );          
          try {
            let res = await fetch(
              `http://localhost:7000/api/v1/storage/upload`,
              {
                  method: 'POST',
                  headers: {
                      'Authorization': `Bearer ${token}`
                  },
                  body: formData
              }
          );
          let data = await res.json();
            console.log(data);
            articlesData.image = data.filename;
            console.log(articlesData.image);
          } catch (err) {
            console.log(err);
          } 
  };

  const getImage = async ()=>{    
    try {
      const res = await fetch(`/api/v1/storage/${articlesData.image}`,{
        method:"GET",
        headers:{
          "Content-type":"application/json",
          "Authorization":`Bearer ${token}`
        }
      });       
      console.log(res);      
    } catch (error) {
      
    }
  }
  const recipeCreate = async () => {    
    try {
        let res = await fetch(
          'http://localhost:7000/api/v1/recipe/create',
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(articlesData)
          }
        );
        getImage();
        console.log(res);            
    } catch (err) {
      console.log(err);
    }
  };   
  useEffect(()=>{   
    getRecipe();     
  },[]);
  return (
    <div id='addrecipe'>     
     <div class='container1'>
       <h1 class='addrecipe-title'>My Recipes</h1>
       <div class='line'></div>
     <Link to='/myrecipes'><img src={pic3} alt='pic3' class='pic3'/></Link>
     </div>     
     <div class='main-container'>
       <div>
        <h4 class='recipe-image'>Recipe Image</h4>
        <img src={image ? URL.createObjectURL(image) : pic} alt='picture' class='addrecipe-pic'/>
        <br/>
        <input  id='upload' type="file" onChange={uploadImg}/>      
       </div> 
       <div>
         <div class='div1'>
           <h4 class='recipe-title'>Recipe Title</h4>
           <input type='text' name="recipe_title" placeholder='meal-name' class='input' value={articlesData.recipe_title} onChange={articleCreate}/>
         </div>                
         <div class='category'>
           <div class='div2'>
            <h4 class='addrecipe-category'>Category</h4>
            <select class='input1' name="category" type='text' value={articlesData.category} onChange={articleCreate}>
              <option></option>
              <option value='breakfast'>breakfast</option>
              <option value='brunch'>brunch</option>
              <option value='lunch'>lunch</option>              
              <option value='dinner'>dinner</option>
            </select>
            {/* <input class='input1' name="category" type='text' value={articlesData.category} onChange={articleCreate}/> */}
           </div>
           <div class='div3'>
            <h4 class='preparation-time'>Preparation Time</h4>
            <input class='input2' name='preparation_time' type='text' value={articlesData.preparation_time} onChange={articleCreate}/>
           </div>
           <div class='div4'>
            <h4 class='no-people'>No.People</h4>
            <input class='input3' name='no_people' type='number' value={articlesData.no_people} onChange={articleCreate}/>
           </div>           
         </div>
         <div class='div5'>
           <h4 class='short-description'>Short Description</h4>
           <textarea class='textarea1' name='short_description' rows={5} value={articlesData.short_description} onChange={articleCreate}></textarea>
         </div>                      
       </div> 
       <div class='div6'>
         <h4 class='recipe'>Recipe</h4>
         <textarea class='textarea2' name='recipe' rows={5} value={articlesData.recipe} onChange={articleCreate}></textarea>
       </div>              
     </div>
     <button class='save' onClick={recipeCreate}>SAVE</button> 
    </div>
  )
}


