import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../css/Createaccount.css';
export const Createaccount = () => {

  const user = {
    first_name: '',
    last_name: '',
    email: '',
    birthday: '',
    password: '',
    repeat_password: ''
  }
  const [userData, setUserData] = useState(user);

  const userCreate = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }
  const accountCreate = async () => {
    try {
      if (userData.password === userData.repeat_password) {

        let res = await fetch(
          'http://localhost:7000/api/v1/auth/create-account',
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(userData)
          }
        );
        console.log(res);       
        if (res.status == 400) {
          alert('Email already in use');
        }
      } else {
        alert("Passwords are not the same")
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div id='createaccount'>
      <div class='createaccount-div1'>
        <h2 class='createaccount-title'>Create Account</h2>
        <div class='createaccount-line'></div>
      </div>
      <div class='createaccount-container'>
        <div class='createaccount-text'>
          <div class='createyouraccount'>
            <h2 class='createyour'>Create your </h2>
            <h2 class='account'>account</h2>
          </div>
          <p class='createaccount-p'>All the Lorem Ipsum generators on the Internet tend to repeat preefined chunks as necessary,making this the first true generator on the Internet.It uses a dictionary of over 200 Latin words combined with a handful of model sentence stuctures to genrate Lorem Ipsum which looks reasonable</p>
        </div>
        <div class='createaccount-inputs'>
          <div class='createaccount-inputs1'>
            <div class='createaccount-div2'>
              <h5 class='createaccount-h5'>First Name</h5>
              <input class='createaccount-input1' type='text' name='first_name' placeholder='First Name' value={userData.first_name} onChange={userCreate} />
            </div>
            <div class='createaccount-div3'>
              <h5 class='createaccount-h5'>Email</h5 >
              <input class='createaccount-input3' type='text' name='email' placeholder='Email' value={userData.email} onChange={userCreate} />
            </div>
            <div class='createaccount-div4'>
              <h5 class='createaccount-h5'>Password</h5 >
              <input class='createaccount-input5' type='password' name='password' placeholder='Password' value={userData.password} onChange={userCreate} />
            </div>
            <button class='createaccount-button' onClick={accountCreate}><Link to='/login'>CREATE ACCOUNT</Link></button>
          </div>
          <div class='createaccount-inputs2'>
            <div class='createaccount-div5'>
              <h5 class='createaccount-h5'>Last Name</h5>
              <input class='createaccount-input2' type='text' name='last_name' placeholder='Last Name' value={userData.last_name} onChange={userCreate} />
            </div>
            <div class='createaccount-div6'>
              <h5 class='createaccount-h5'>Birthday</h5>
              <input class='createaccount-input4' type='date' name='birthday' placeholder='Birthday' value={userData.birthday} onChange={userCreate} />
            </div>
            <div class='createaccount-div7'>
              <h5 class='createaccount-h5'>Repeat Password</h5>
              <input class='createaccount-input6' type='password' name='repeat_password' placeholder='Repeat Password' value={userData.repeat_password} onChange={userCreate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}