"use client";
import {useContext, useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { AuthAdminContext } from '@/components/AuthAdminProvider';
import Image from 'next/image';
export default function AdminNavbar() {
    const [isMobileDropdownVisible, setIsMobileDropdownVisible] = useState(false);
    const authAdmin = useContext(AuthAdminContext);
    useEffect(()=>{
        authAdmin.getData();
    },[]);
    return (
        <>
            <div className='bg-neutral-800 font-bold'>
                <div className="flex flex-row justify-between items-center md:hidden">
                    <Image src="/logo.png" width="100" height="100" className='w-10' alt="Logo"></Image>  
                    <div className='md:hidden'>
                        <FontAwesomeIcon icon={faBars} onClick={() => setIsMobileDropdownVisible(prev=>!prev)} className="text-2xl text-white hover:cursor-pointer" />
                    </div>
                </div>
                <div className={`${isMobileDropdownVisible? 'flex' : 'hidden'} md:hidden flex-col`}>
                    {Object.keys(authAdmin.adminData).length > 0 ? (
                        <>
                        <Link href="/admin/Products">
                            <div className='p-2 hover:bg-amber-700 hover:cursor-pointer text-white'>
                            Products List
                            </div>
                        </Link>
                        <Link href="/admin/add-product">
                            <div className='p-2 hover:bg-amber-700 hover:cursor-pointer text-white'>
                            Add Product
                            </div>
                        </Link>
                        <Link href="/admin/orders">
                            <div className='p-2 hover:bg-amber-700 hover:cursor-pointer text-white'>
                            Orders
                            </div>
                        </Link>
                        <Link href="/admin/logout">
                            <div className='p-2 hover:bg-amber-700 hover:cursor-pointer text-white'>
                            Log Out
                            </div>
                        </Link>
                        </>
                    ) : (<></>)}
                </div>
                <div className="hidden md:flex justify-between items-center mx-5">
                    <Image src="/logo.png" width="100" height="100" className='w-10' alt="Logo"></Image>        
                    <div className='flex gap-5 transition-color duration-700'>
                        {Object.keys(authAdmin.adminData).length > 0 ? (
                        <>
                            <Link href="/admin/Products">
                            <div className='p-2 hover:bg-amber-700 hover:cursor-pointer rounded-lg text-white transition-all duration-500'>
                                Products List
                            </div>
                            </Link>
                            <Link href="/admin/add-product">
                            <div className='p-2 hover:bg-amber-700 hover:cursor-pointer rounded-lg text-white transition-all duration-500'>
                                Add Product +
                            </div>
                            </Link>
                            <Link href="/admin/orders">
                            <div className='p-2 hover:bg-amber-700 hover:cursor-pointer rounded-lg text-white transition-all duration-500'>
                                Orders
                            </div>
                            </Link>
                            <Link href="/admin/logout">
                            <div className='p-2 hover:bg-amber-700 hover:cursor-pointer rounded-lg text-white transition-all duration-500'>
                                Log Out
                            </div>
                            </Link>
                        </>
                        ): (<></>)}
                    </div>
                </div>
            </div>
        </>
    )   
}
