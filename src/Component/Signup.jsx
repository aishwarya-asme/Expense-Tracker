import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [signIn,setSignIn]=useState(false);
    const [errMsg,setErrMsg]=useState(null);
    const navigate=useNavigate();

    const email=useRef(null);
    const password=useRef(null);
    const confirmPassword=useRef(null);

    const matchPassword=()=>{
      if(password.current.value===confirmPassword.current.value){
        setErrMsg("Password Matched !")
      }
    }
    
    const toggle=()=>{
      setSignIn(!signIn)
    }

    useEffect(()=>{
      if(errMsg){
        const timer=setTimeout(()=>{
          setErrMsg(null);
        },4000);

        return()=>{
          clearTimeout(timer)
        }
      }
    },[errMsg])
    
    const handleSubmit=async(e)=>{
      e.preventDefault();

      const enteredEmail=email.current.value;
      const enteredPass=password.current.value;

      if (signIn) {
        try{
            const response=await fetch(
              'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4xAeGjkhVqInw_vpGG1ey_Z3A0vZvFXc',
              {
                  method:"POST",
                  body: JSON.stringify({
                    email:enteredEmail,
                    password: enteredPass,
                    returnSecureToken: true,
                  }),
                headers:{
                  "Content-type":"application/json",
                },  
              }
            );

            if (response.ok) {
              const data=await response.json();
              console.log(data.idToken);
              localStorage.setItem("idToken",data.idToken);
              navigate("/Home")
            } else {
              const data=await response.json();
              setErrMsg(data.error.message)
            }
        }
        catch(error){
          console.log("Error",error)
        }
      } 
      
      else {
        try{
          const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4xAeGjkhVqInw_vpGG1ey_Z3A0vZvFXc',
          {
            method:"POST",
            body: JSON.stringify({
            email:enteredEmail,
            password: enteredPass,
            returnSecureToken: true,
          }),
          headers:{
            "Content-type":"application/json",
          }, 
        }
      );

      if (response.ok) {
        const data=await response.json();
        console.log(data.idToken)
      } else {
        const data=await response.json();
        setErrMsg(data.error.message)
      }
      }
      catch(error){
        console.log("Error",error)
      }
    } 
  }
    
  return (
    <div className='w-1/4 h-auto mx-auto border bg-white border-gray-400 mt-40 text-center'>
      <h1 className='text-2xl text-green-600 py-8 font-semibold text-center'>{!signIn?"Sign Up":"Login"}</h1>
      <p className='text-lg py-1 text-red-500'>{errMsg}</p>
    <form className='flex justify-center flex-col w-[70%] mx-auto space-y-4' onSubmit={(e)=>{handleSubmit(e);}}>
        <input className='border border-green-600 p-2 rounded-md'  type='email' placeholder='Email' ref={email}/>
        <input  className='border border-green-600 p-2 rounded-md' type='password' placeholder='Password' ref={password}/>
       {!signIn && <input  className='border border-green-600 p-2 rounded-md' type='password' placeholder='Confirm Password' onChange={matchPassword} ref={confirmPassword}/>}
        <button className='border bg-green-600 p-2 rounded-md'>{!signIn?"Sign Up":"Login"} Up</button>
    </form>

    <button className='font-semibold my-10' onClick={toggle}>{!signIn ? "Have an account ? Login":"New User ? Sign Up"} </button>
    </div>
  )
}

export default Signup