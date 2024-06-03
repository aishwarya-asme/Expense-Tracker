import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice";

const Signup = () => {
    const [signIn,setSignIn]=useState(true);
    const [errMsg,setErrMsg]=useState(null);
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [forgotPassword,setForgotPassword]=useState(false)

    const email=useRef(null);
    const password=useRef(null);
    const confirmPassword=useRef(null);

    const matchPassword=()=>{
      if(password.current.value===confirmPassword.current.value){
        setErrMsg("Password Matched !");
      }
    };

    const toggle=()=>{
      setSignIn(!signIn)
    }

    const forgotPasswordToggle =()=>{
      setForgotPassword(!forgotPassword)
    }

    const handleForgotPassword=async(e)=>{
      e.preventDefault();
  
      const enteredEmail = email.current.value;
  
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD4xAeGjkhVqInw_vpGG1ey_Z3A0vZvFXc",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              requestType: "PASSWORD_RESET",
            }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        if (response.ok) {
          //
          alert("Password reset link has been sent to you email")
        } else {
          const data = await response.json();
          console.log(data);
        }
      } catch (error) {
        console.error("Error", error);
      }
    };

    useEffect(()=>{
      if(errMsg){
        const timer=setTimeout(()=>{
          setErrMsg(null);
        },4000);

        return()=>{
          clearTimeout(timer);
        };
      }
    },[errMsg]);
    
    const handleSubmit=async(e)=>{
      e.preventDefault();

      const enteredEmail=email.current.value;
      const enteredPass=password.current.value;

      if (signIn) {
        try{
            const response=await fetch(
              "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4xAeGjkhVqInw_vpGG1ey_Z3A0vZvFXc",
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
              // console.log(data.idToken);
              // localStorage.setItem("idToken",data.idToken);
              const idToken = data.idToken;
          localStorage.setItem("idToken", idToken);
          dispatch(login({ tokenID: idToken, userID: enteredEmail }));



              localStorage.setItem("user",enteredEmail);
              navigate("/home")
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
          const response=await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4xAeGjkhVqInw_vpGG1ey_Z3A0vZvFXc',
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
    <>
   {!forgotPassword ? (
     <div className='w-3/4 md:w-1/4 h-auto mx-auto border bg-white border-gray-400 mt-10 md:mt-40 text-center'>
      <h1 className='text-2xl text-green-600 py-8 font-semibold text-center'>
        {!signIn ? "Sign Up":"Login"}
        </h1>
      <p className='text-lg py-1 text-red-500'>{errMsg}</p>

    <form className='flex justify-center flex-col w-[70%] mx-auto space-y-4' onSubmit={(e)=>{handleSubmit(e);}}>

        <input className='border border-green-600 p-2 rounded-md'  type='email' placeholder='Email' ref={email}/>
        <input  className='border border-green-600 p-2 rounded-md' type='password' placeholder='Password' ref={password}/>
       {!signIn && ( <input  className='border border-green-600 p-2 rounded-md' type='password' placeholder='Confirm Password' onChange={matchPassword} ref={confirmPassword}/>)}
        <button className='bg-green-600 rounded-3xl text-white p-2 shadow-md font-semibold my-10'>{!signIn ? "Sign Up":"Login"} </button>
    </form>

    <button className='my-6 font-semibold' onClick={toggle}>{!signIn ? "Have an account ? Login":"New User ? Sign Up"} </button>

    <div className="pb-10 font-semibold text-red-500"> 
    <Link onClick={forgotPasswordToggle}>Forgot Password</Link>
    </div>
    </div>
  ) : (
    <div className="w-3/4 md:w-1/4 h-auto mx-auto border bg-white border-gray-300 mt-40 text-center">
    <form className="flex justify-center pt-10 flex-col w-[70%] mx-auto space-y-4"
    onSubmit={(e)=>{
      handleForgotPassword(e);
    }}>
    <input
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Email"
              type="email"
              ref={email}
            />

            <button className="bg-blue-500 rounded-3xl font-semibold text-white p-2 shadow-md">
            Set Password </button>      
    </form>

    <div className="py-5 font-semibold text-red-500">
    <Link onClick={forgotPasswordToggle}>
      Already set password? Login now</Link>
    </div>
    </div>
  )}
    </>
  );
};

export default Signup;