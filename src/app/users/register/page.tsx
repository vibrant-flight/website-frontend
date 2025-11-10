"use client";
import {faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState,useEffect,useContext, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import {AuthContext} from '@/components/AuthProvider';
import { UserView } from '@/utils/users/userView';
export default function Register() {
  const [passwordVisibility,setPasswordVisibility] = useState<Boolean>(false);
  const [userData,setUserData] = useState<UserView>({} as UserView);
  const router = useRouter();
  const [openPopUpVisibility,setOpenPopUpVisibility] = useState<Boolean>(false);
  const [errors,setErrors] = useState<Record<string, boolean>>({});
  const [OTP,setOTP] = useState<String>("");
  const auth = useContext(AuthContext);
  const [OTPVerified,setOTPVerified] = useState<Boolean>(false);
  const [errorBackend,setErrorBackend] = useState<String>("");
  const updateUserData = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData(prev=>({
      ...prev,
      [e.target.name]:e.target.value,
    }));
    setErrors(prev=>({
      ...prev,
      [e.target.name]:false,
    }));
  }
  useEffect(()=>{
    auth.getData();
    if(Object.keys(auth.userData).length >0) {
      router.push("/");
    }
  },[]);
  const sendOTP = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/get-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }).then(async(res)=>{
      if(res.ok) {
        setOpenPopUpVisibility(true);
      }
      else {
        let data = await res.json();
        setErrorBackend(data.errorMessage);
      }
    }).catch(async(err)=>{
      const msg = await err?.text?.();
      setErrorBackend(msg || "Something went wrong");
    })
  }
  const validateOTP = () => {
    const OTPData = {
      email: userData.email,
      password: OTP
    }
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/validate-otp`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(OTPData)
    }).then(async(res) => {
      if(res.ok) {
        setOTPVerified(true);
      }
      else {
        let data = await res.json();
        setErrorBackend(data.errorMessage);
      }
      setOpenPopUpVisibility(false);
    }).catch(async(err)=>{
      setOpenPopUpVisibility(false);
      const msg = await err?.text?.();
      setErrorBackend(msg || "Something went wrong");
    })
  }
  const registerUser = () => {
    const currentError: Record<string, boolean> = {};
    const u = userData as any;
    if(!u.firstName || u.firstName === "") currentError.firstName = true;
    if(!u.lastName || u.lastName === "") currentError.lastName = true;
    if(!u.email || u.email === "") currentError.email = true;
    if(!u.password || u.password === "") currentError.password = true;
    if(!u.confirmPassword || u.confirmPassword === "") currentError.confirmPassword = true;
    if(u.password !== u.confirmPassword) {
      currentError.confirmPassword = true;
      currentError.password = true;
    }
    setErrors(currentError);
    if(Object.keys(currentError).length === 0) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      }).then(async(res)=>{ 
        if(res.ok) {
          router.push("/users/login");
        }
        else {
          let data = await res.json();
          setErrorBackend(data.errorMessage);
        }
      }).catch(async(err)=>{
        const msg = await err?.text?.();
        setErrorBackend(msg || "Something went wrong");
      })
    }
  }
  return (
    <>
      <div className="flex flex-col font-bold bg-neutral-800 items-center w-full max-w-lg m-auto justify-center min-h-[60vh] overflow-hidden shadow-lg p-4 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">Register</h2>
        <form className="w-full bg-neutral-900 rounded-lg shadow p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div className="w-full bg-red-800 text-red-400 text-3xl text-center">
            {errorBackend}
          </div>
          <div>
            <label className="block text-white font-semibold mb-1 sm:mb-2" htmlFor="title">
              First Name
            </label>
            <input type="text" id="firstName" name="firstName" onChange={updateUserData} placeholder="enter your first name" className={`border ${errors.firstName? 'border-red-300' : 'border-yellow-300'} bg-gray-600 text-white w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400`}/>
          </div>
          <div>
            <label className="block text-white font-semibold mb-1 sm:mb-2" htmlFor="title">
              Last Name
            </label>
            <input type="text" id="lastName" name="lastName" onChange={updateUserData} placeholder="enter your last name" className={`border ${errors.lastName? 'border-red-300' : 'border-yellow-300'} bg-gray-600 text-white w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400`}/>
          </div>
          <div>
            <label className="block text-white font-semibold mb-1 sm:mb-2" htmlFor="title">
              Email
            </label>
            <div className="flex flex-row">
              <input type="text" id="email" name="email" onChange={updateUserData} placeholder="enter your Email ID" className={`w-[80%] border ${errors.email? 'border-red-300' : 'border-yellow-300'} bg-gray-600 text-white w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400`}/>
              <button type="button" onClick={sendOTP} className={`${OTPVerified? 'bg-green-700 hover:cursor-no-drop' : 'bg-yellow-600 hover:bg-yellow-700 hover:cursor-pointer'} w-[20%] text-white flex items-center justify-center px-2`}>
                {OTPVerified? 'Verified' : 'verify'}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-white font-semibold mb-1 sm:mb-2" htmlFor="title">
              Password
            </label>
            <div className="flex flex-row">
              <input type={`${passwordVisibility? 'text' : 'password'}`} id="password" name="password" onChange={updateUserData} placeholder="enter your Password" className={`w-[90%] border ${errors.password? 'border-red-300' : 'border-yellow-300'} bg-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400`}/>
              <div className="bg-yellow-600 hover:bg-yellow-700 w-[10%] text-white flex items-center justify-center">
                <FontAwesomeIcon icon={passwordVisibility? faEye : faEyeSlash} onClick={()=>setPasswordVisibility(prev=>!prev)} className="text-2xl hover:cursor-pointer" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-white font-semibold mb-1 sm:mb-2" htmlFor="title">
              Confirm Password
            </label>
            <input type="password" id="confirmPassword" name="confirmPassword" onChange={updateUserData} placeholder="enter your Confirm Password" className={`border ${errors.confirmPassword? 'border-red-300' : 'border-yellow-300'} bg-gray-600 text-white   w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400`}/>
          </div>
          <button type="button" onClick={registerUser} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition">
            Sign Up
          </button>
        </form>
      </div>
      {openPopUpVisibility && (
        <div className="fixed font-bold inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-neutral-800 rounded-lg shadow-lg p-6 w-full max-w-xs flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4 text-white">Verify OTP</h3>
            <input type="text" maxLength={6} onChange={(e)=>setOTP(e.target.value)} placeholder="Enter OTP" className="mb-4 px-4 py-2 border border-yellow-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-600 text-white" />
            <div className="flex gap-2 w-full">
              <button type="button" className="flex-1 bg-yellow-600 hover:bg-yellow-700 hover:cursor-pointer text-white font-semibold py-2 rounded transition" onClick={()=> validateOTP()}>
                Verify
              </button>
              <button type="button" className="flex-1 bg-gray-300 hover:bg-gray-400 hover:cursor-pointer text-black font-semibold py-2 rounded transition" onClick={() => setOpenPopUpVisibility(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
