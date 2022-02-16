import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useHistory } from 'react-router-dom';
import picture from '../pictures/logo_color.svg';
import '../css/Header.css';
export const Header = () => {
  const history = useHistory()

  const [login,setLogIn]=useState(false);

  const getUser = async(token)=>{
    try {
      const res = await fetch("/api/v1/auth/validate",{
        method:"GET",
        headers:{
          "Content-type":"application/json",
          "Authorization":`Bearer ${token}`
        }
      });
      if(res.status === 200){
       await res.json()
       setLogIn(true);        
      }else{
        // return history.push("/")
      }        
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    const token = localStorage.getItem("jwt")
    getUser(token)
  },[login])
  
    return (
      <div id = 'header-container'>
       <nav>
           <Link to='/'><img src={picture} alt='baby' class='babyfood'/></Link>
           <ul>            
             <li><Link to='/breakfast'>BREAKFAST</Link></li>
             <li><Link to='/brunch'>BRUNCH</Link></li>
             <li><Link to='/lunch'>LUNCH</Link></li>
             <li><Link to='/dinner'>DINNER</Link></li>
           </ul> 
           {!login ? <div class="nav-buttons">         
             <button class='login-nav'>
                <Link to ='/login'>LOG IN</Link>
             </button>            
            <span class='or'>or</span>            
            <button class='account-nav'>
               <Link to ='/create-account'>CREATE ACCOUNT</Link>
            </button>
           </div> :  <div class="nav-links">
             <li><Link to='/myrecipes'>My Recipes</Link></li>
             <li><Link to='/my-profile'>My Profile</Link></li>
             <li><button class='log-out' onClick={()=>{
               setLogIn(false)
               localStorage.removeItem('jwt');
               history.push('/login');
             }}>LOG OUT</button>
             </li>      
           </div>}                                         
        </nav>          
      </div>
    )
}