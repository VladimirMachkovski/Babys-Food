import React,{useState,useEffect} from 'react';
import pic2 from '../pictures/avatar.png';
import { useHistory } from 'react-router-dom';
import '../css/Myprofile.css';
export const Myprofile = ()=>{
  const history = useHistory()

  const userDataInit = {
    first_name:"",
    last_name:"",
    email: '',
    birthday:"",
    password: '',
    repeat_password: '',
    image:""
  };
  const [userData, setUserData] = useState(userDataInit);
  const [image,setImage]=useState();
  const [id,setId]=useState(null);
  const token = localStorage.getItem("jwt")
  const getUser = async()=>{
    try {
      const res = await fetch("/api/v1/auth/validate",{
        method:"GET",
        headers:{
          "Content-type":"application/json",
          "Authorization":`Bearer ${token}`
        }
      })
      if(res.status === 200){
        const data = await res.json()       
        setUserData(data);
        setId(data._id);
      }else{
        return history.push("/login");
      }         
    } catch (error) {
      console.log(error);
    }
  }
 
  const updateAccount = async()=>{
    try {
      const res = await fetch(`/api/v1/auth/update-account/${id}`,{
        method:"PATCH",
        headers:{
          "Content-type":"application/json",
          "Authorization":`Bearer ${token}`
        },    
        body: JSON.stringify(userData) 
      })
      getImage();
      console.log(res);                
    } catch (error) {
      console.log(error);
      }}  

      const uploadImg = async (e) => {
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
            userData.image = data.filename;
            console.log(userData.image);
        } catch (err) {
            console.log(err);
        }
    }
  const getImage = async ()=>{    
    try {
      const res = await fetch(`/api/v1/storage/${userData.image}`,{
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
  const updateInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  useEffect(()=>{   
    getUser();     
  },[]);
  
  return (
    <div id='myprofile'>      
     <div class='myprofile-div1'>
       <h2 class='myprofile-title'>My Profile</h2>
       <div class='myprofile-line'></div>
     </div>
     <div class='myprofile-main-div'>
       <div class='avatar-div'>        
       <img src={image ? window.URL.createObjectURL(image) : pic2} alt='picture' class='myprofile-pic2' name="image" value={userData.image}/>
        <br/>
        <input  class='change-avatar' type="file" onChange={uploadImg}/>
       </div>
       <div class='myprofile-inputs'>
         <div class='myprofile-inputs1'>
          <div class='myprofile-div2'>
            <h5 class='myprofile-h51'>First Name</h5>
            <input type='text' class='myprofile-input1' value={userData.first_name} name='first_name' onChange={updateInput}/>
          </div>
          <div class='myprofile-div3'>
            <h5 class='myprofile-h52'>Email</h5>
            <input type='text' class='myprofile-input2' value={userData.email} name='email'/>
          </div>
          <div class='myprofile-div4'>
            <h5 class='myprofile-h53'>Password</h5>
            <input type='password' class='myprofile-input3' value={userData.password} name='password'/>
          </div>
          <button class='myprofile-save'   onClick={ () =>  updateAccount()} >SAVE</button>  
          <img src={userData.imgae}/>        
         </div>         
         <div class='myprofile-inputs2'>
          <div class='myprofile-div5'>
            <h5 class='myprofile-h54' >Last Name</h5>
            <input type='text' class='myprofile-input4' name='last_name' value={userData.last_name} onChange={updateInput}/>
          </div>
          <div class='myprofile-div6'>
            <h5 class='myprofile-h55'>Birthday</h5>
            <input type='text' class='myprofile-input5' name='birthday' value={userData.birthday} onChange={updateInput}/>
          </div>
          <div class='myprofile-div7'>
            <h5 class='myprofile-h56'>Repeat Password</h5>
            <input type='password' class='myprofile-input6' value={userData.repeat_password} nama='repeat_password'/>
          </div>
         </div>
       </div>
     </div>
    </div>
  )
}