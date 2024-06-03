import React, { useRef } from 'react'
import {useSelector} from "react-redux";

const Profile = (props) => {
    // const tokenID=localStorage.getItem("idToken")
    const token_ID=useSelector((store)=>store.auth.tokenID);
    const name=useRef(null);
    const photoURL=useRef(null);

    const updateProfile=async(event)=>{
        event.preventDefault();

        const enteredName=name.current.value;
        const enteredURL=photoURL.current.value;

        try{
            const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD4xAeGjkhVqInw_vpGG1ey_Z3A0vZvFXc',
            {
                method:"POST",
                body:JSON.stringify({
                    idToken:token_ID,
                    displayName:enteredName,
                    photoURL:enteredURL,
                    returnSecureToken:true,
                }),
            }
        );
            if (response.ok) {
                const data=await response.json();
                console.log(data);
            } else {
                const data1 = await response.json();
                const msg = data1.error.message;
                console.log(msg);
            }
        } 
        catch(error){
            console.log("Error:",error)
        }
    }
  return (
    <div className="w-3/4 md:w-[30%] mx-auto">
        <form 
         className="mx-auto w-full justify-evenly flex flex-col md:flex-row shadow-md p-8 md:p-10 m-10 border border-gray-400 rounded-md"
         onSubmit={(e)=>{updateProfile(e);}}>
            <input className="p-2 m-2 md:m-0 border border-gray-400 rounded-md"type="text" placeholder='Full Name' ref={name} />
            <input className="p-2 m-2 md:m-0 border border-gray-400 rounded-md" type="text" placeholder='Profile Photo URL' ref={photoURL} />
            <button className="bg-blue-500 m-2 md:m-0 rounded-md shadow-md text-white font-semibold p-2">Add</button>
        </form>
    </div>
  )
}

export default Profile