import React,{useState} from "react";
import '../css/Login.css';
export const Login = () => {
  
  const loginDataInit = {
    email: '',
    password: '',
  };
  const [loginData, setLoginData] = useState(loginDataInit);

  const loginFieldUpdate = (e) => {
    setLoginData({...loginData, [e.target.name]: e.target.value});
  };

  const loginBtn = async () => {
   
    try {
      let res = await fetch(
        'http://localhost:7000/api/v1/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        }
      );
      if(res.status === 200){
        let token = await res.text();       
        localStorage.setItem('jwt', token);
        window.location.href = "/my-profile"
    }
   } catch(err) {
      console.log(err);
    }
  };
  
  return (
    <div id='login'> 
      <div class='login-container'>
        <h2 class='login-title'>Log in</h2>
        <div class='login-line'></div>
      </div>      
      <div class='login-main-div'>
        <div class='login-div1'>
          <h2 class='login-welcome'>Welcome to <span class='login-span'>Baby's</span></h2>          
          <p class='login-p2'>All the Lorem Ipsum genrators on the Internet tend to repeat predenfined chunks as necessary, making this the first true generator on the internet.It uses a dictionarty of over 200 Latin words, combined with a handful of model sentence structures. to generate Lorem Ipsom which looks reasonable.The genrated Lorem Ipsum is therefore always free form repetition, injected humor, of non-characterictic words etc.</p>
        </div>
        <div id='login-inputs'>
          <div class='login-input1'>
            <h3 class='email-type'>Email</h3>           
            <input type='text' name='email'placeholder='Email' class='login-input-user' value={loginData.email} onChange={loginFieldUpdate}/>
          </div>         
          <div class='login-input2'>
            <h3 class='password-type'>Password</h3>            
            <input type='password' name='password' placeholder='Password'  class='login-input-password' value={loginData.password} onChange={loginFieldUpdate}/>
          </div>    
          <button class='login-button' onClick={loginBtn}>LOG IN</button>                
        </div>        
      </div>     
    </div>
  )
}