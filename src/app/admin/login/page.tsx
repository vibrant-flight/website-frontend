"use client";
import {faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import {useRouter} from 'next/navigation';
import { AuthAdminContext } from '@/components/AuthAdminProvider';
import { UserView } from '@/utils/users/userView';
export default function AdminLogin() {
    const [passwordVisibility,setPasswordVisibility] = useState(false);
    const [adminData,setAdminData] = useState<UserView>({} as UserView);
    const router = useRouter();
    const [errors,setErrors] = useState<Record<string,Boolean>>({});
    const [errorBackend,setErrorBackend] = useState("");
    const adminAuth = useContext(AuthAdminContext)
    const updateAdminData = (e:ChangeEvent<HTMLInputElement>) => {
        setAdminData(prev=>({
        ...prev,
        [e.target.name]:e.target.value,
        }));
        setErrors(prev=>({
        ...prev,
        [e.target.name]:false,
        }));
    }
    useEffect(() => {
        adminAuth.getData();
    }, []);  
    useEffect(() => {
        if (adminAuth.adminData?.isAdmin) {
            router.push("/admin/Products");
        }
    }, [adminAuth.adminData]);
    const logIn = () => {
        const currentError:Record<string,boolean> = {};
        if(!adminData.email || adminData.email === "") currentError.email = true;
        if(!adminData.password || adminData.password === "") currentError.password = true;
        setErrors(currentError);
        if(Object.keys(currentError).length === 0) {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admins/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(adminData)
        }).then(async(res)=>{
            if(res.ok) {
            adminAuth.getData();
            router.push("admin/orders");
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
        <div className="dark:bg-neutral-700 font-bold flex flex-col items-center w-full max-w-lg m-auto justify-center min-h-[60vh] overflow-hidden bg-yellow-50 shadow-lg p-4 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6 text-center">Admin Log In</h2>
            <form className="w-full bg-white dark:bg-neutral-800 dark:shsdow-xl  rounded-lg shadow p-4 sm:p-6 space-y-4 sm:space-y-5">
            <div className="w-full bg-red-800 text-red-400 text-3xl text-center">
                {errorBackend}
            </div>
            <div>
                <label className="block text-black dark:text-white font-semibold mb-1 sm:mb-2" htmlFor="title">
                Email
                </label>
                <input type="text" id="email" name="email" onChange={updateAdminData} placeholder="enter your user name / email" className={`border ${errors.userName? 'border-red-300' : 'border-yellow-300'} dark:bg-gray-600 bg-white dark:text-white w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400`}/>
            </div>
            <div>
                <label className="block text-black dark:text-white font-semibold mb-1 sm:mb-2" htmlFor="title">
                Password
                </label>
                <div className="flex flex-row">
                <input type={`${passwordVisibility? 'text' : 'password'}`} id="password" name="password" onChange={updateAdminData} placeholder="enter your Password" className={`w-[90%] border ${errors.password? 'border-red-300' : 'border-yellow-300'} dark:bg-gray-600 dark:text-white bg-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400`}/>
                <div className="bg-yellow-700 w-[10%] text-white flex items-center justify-center">
                    <FontAwesomeIcon icon={passwordVisibility? faEye : faEyeSlash} onClick={()=>setPasswordVisibility(prev=>!prev)} className="text-2xl hover:cursor-pointer" />
                </div>
                </div>
            </div>
            <button type="button" onClick={logIn} className="w-full bg-yellow-600 hover:bg-yellow-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded transition">
                Log In
            </button>
            </form>
        </div>
        </>
    )
}
