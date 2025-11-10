"use client";
import {faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import {AuthContext} from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { UserView } from '@/utils/users/userView';
import Link from 'next/link';
export default function Login() {
  const [passwordVisibility,setPasswordVisibility] = useState(false);
  const [userData,setUserData] = useState<UserView>({} as UserView);
  const router = useRouter();
  const [errors,setErrors] = useState<Record<string,Boolean>>({});
  const [errorBackend,setErrorBackend] = useState("");
  const auth = useContext(AuthContext);
  const updateUserData = (e:ChangeEvent<HTMLInputElement>) => {
    setUserData(prev=>({
      ...prev,
      [e.target.name]:e.target.value,
    }));
    setErrors(prev=>({
      ...prev,
      [e.target.name]:false,
    }));
  }
  useEffect(() => {
    auth.getData();
  }, []);  
  useEffect(() => {
    if(Object.keys(auth.userData).length>0) {
      router.push("/");
    }
  }, [auth.userData]);
  const logIn = () => {
    const currentError:Record<string,Boolean> = {};
    if(!userData.email || userData.email === "") currentError.email = true;
    if(!userData.password || userData.password === "") currentError.password = true;
    setErrors(currentError);
    if(Object.keys(currentError).length === 0) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(userData)
      }).then(async(res)=>{
        if(res.ok) {
          auth.getData();
          router.push("/");
        }
        else {
          let data = await res.json();
          setErrorBackend(data.errorMessage);
        }
      }).catch(async(err)=>{
        const msg = await err?.text?.();
        setErrorBackend(msg || "Something went wrong");
      });
    }
  }
  return (
    <>
      <div className="bg-neutral-700 font-bold flex flex-col items-center w-full max-w-lg m-auto justify-center min-h-[60vh] overflow-hidden shadow-lg p-4 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">Log In</h2>
        <form className="w-full bg-neutral-800 shsdow-xl  rounded-lg shadow p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div className="w-full bg-red-800 text-red-400 text-3xl text-center">
            {errorBackend}
          </div>
          <div>
            <label className="block text-white font-semibold mb-1 sm:mb-2" htmlFor="title">
              Email
            </label>
            <input type="text" id="email" name="email" onChange={updateUserData} placeholder="enter your user name / Email" className={`border ${errors.userName? 'border-red-300' : 'border-amber-300'} bg-gray-600 text-white w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400`}/>
          </div>  
          <div>
            <label className="block text-white font-semibold mb-1 sm:mb-2" htmlFor="title">
              Password
            </label>
            <div className="flex flex-row">
              <input type={`${passwordVisibility? 'text' : 'password'}`} id="password" name="password" onChange={updateUserData} placeholder="enter your Password" className={`w-[90%] border ${errors.password? 'border-red-300' : 'border-amber-300'} bg-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400`}/>
              <div className="bg-amber-700 w-[10%] text-white flex items-center justify-center">
                <FontAwesomeIcon icon={passwordVisibility? faEye : faEyeSlash} onClick={()=>setPasswordVisibility(prev=>!prev)} className="text-2xl hover:cursor-pointer" />
              </div>
            </div>
          </div>
          <div>
            <span>
              <Link href="/users/forgot-password" className='underline text-white'>Forgot Password</Link>
            </span>
          </div>
          <button type="button" onClick={logIn} className="w-full bg-amber-600 hover:bg-amber-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded transition">
            Log In
          </button>
          <div className='my-5'>
            <Link href="/users/register" className='underline text-white'>
              Not Have Account Sign Up
            </Link>
          </div>
        </form>
      </div>
      </>
  )
}
