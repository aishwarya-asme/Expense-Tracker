import React, { useEffect, useState } from 'react'
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Store/authSlice";

const Header = () => {
  const [profile,setProfile]=useState(false);
  // const tokenID=localStorage.getItem("idToken");
  const token_ID = useSelector((store) => store.auth.tokenID);
  const [displayName,setdisplayName]=useState(null);
  const [photoURL,setphotoURL]=useState(null);
  const [profileComplete,setProfileComplete]=useState(false);
  const navigate=useNavigate();
  // const isLoggedIn=!!tokenID;
  const dispatch = useDispatch();
  const isLogin = useSelector((store) => store.auth.isAuthenticated);

  
  const handleProfile=()=>{
    setProfile(!profile)
  };

  useEffect(()=>{
    const fetchData = async () => {
    try {
      const response=await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD4xAeGjkhVqInw_vpGG1ey_Z3A0vZvFXc",
          {
            method: "POST",
            body: JSON.stringify({ idToken: token_ID }),
            headers: {
              "Content-type": "application/json",
            },
          }
      );
      if (response.ok) {
        const data = await response.json();
        const data1 = data.users[0];
        data1.displayName
            ? setProfileComplete(true)
            : setProfileComplete(false);
        setdisplayName(data1.displayName);
        setphotoURL(data1.photoUrl);
        setProfileComplete(true);
      } else {
        const data1 = await response.json();
        const msg = data1.error.message;
        console.log(msg);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fetchData();
},[token_ID]);


const handleLogout = () => {
  localStorage.removeItem("idToken");
  dispatch(logout());
  navigate("/");
};

  return (
    <div>
        <div className='flex bg-green-500 justify-evenly text-xl shadow-md w-full font-medium'>
          <div className='flex w-1/4 justify-evenly py-10'>
            <h1>Home</h1>
            <h1>Products</h1>
            <h1>About Us</h1>
            </div>
           
           {!profileComplete && isLogin ?(
            <h1 className="text-lg text-center m-4 p-4">
            Your profile is incomplete.{" "}
            <button 
            onClick={handleProfile} 
            className='text-blue-500'>Complete Now
            </button>
            </h1>
           ):(
            ""
           )}

              {
                isLogin &&(
                  <div className="flex my-5">
                    {profileComplete && (
                      <>
                      <img 
                      className='w-14 h-14 mx-2 rounded-full'
                      src={photoURL} alt="logo" />
                      <h1 className='py-4'>{displayName}</h1>
                      </>
                    )}
                    <button className="mx-4 px-4 m-2 text-lg bg-blue-500 text-white font-semibold shadow-md rounded-md  hover:bg-blue-600"
              onClick={handleLogout}>LogOut</button>
                  </div>
                )
              }
            <div>
              <img className='w-14 h-14 mx-2 rounded-full' src={photoURL} alt="logo" />
              <h1 className='py-4'>{displayName}</h1>
            </div>
        </div>
       { profile && <Profile handleProfile={handleProfile}/>}
    </div>
  );
};

export default Header;