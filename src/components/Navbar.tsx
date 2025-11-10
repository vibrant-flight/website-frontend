"use client";
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '@/components/AuthProvider';
import Link from 'next/link';
import Image from 'next/image';
import {faCartArrowDown, faBars, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Navbar() {
    const [isMobileDropdownVisible, setIsMobileDropdownVisible] = useState(false);
    const [isProfileDropDownMenu,setIsProfileDropDownMenu] = useState(false);
    const auth = useContext(AuthContext);
    const profileMenuRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
      auth.getData();
      function handleClickOutside(event: MouseEvent) {
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
          setIsProfileDropDownMenu(false);
        } 
      }
      if (isProfileDropDownMenu) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isProfileDropDownMenu]);
    return (
      <div className="bg-neutral-900 font-[interblack] border-neutral-700">
        <div className="flex justify-between items-center md:hidden">
          <div className='text-white m-auto font-[interblack] text-3xl px-3 font-bold text-shadow-xl italic'>
            <Image src="/logo.png" width="100" height="100" className='w-10' alt="Logo"></Image>
          </div>
          {Object.keys(auth.userData).length > 0 ? (
            <>
              <div>
              <Link href="/users/cart" onClick={() => setIsMobileDropdownVisible(false)}>
                <div className='mx-2 font-bold hover:bg-yellow-700 hover:cursor-pointer text-white'>
                  <FontAwesomeIcon icon={faCartArrowDown} className='text-white px-2' />
                </div>
              </Link>
            </div>
            </>
          ):(<></>)}
          <div className='md:hidden'>
            <FontAwesomeIcon icon={faBars} onClick={() => setIsMobileDropdownVisible(prev=>!prev)} className="text-2xl text-white mr-2 hover:cursor-pointer" />
          </div>
        </div>
        <div className={`${isMobileDropdownVisible ? 'flex' : 'hidden'} md:hidden flex-col`} id='mobile-dropdown'>
          <Link href="/" onClick={() => setIsMobileDropdownVisible(false)}>
            <div className='p-2 hover:bg-yellow-700 hover:cursor-pointer text-white font-bold'>
                Home
            </div>
          </Link>
          <Link href="/products" onClick={() => setIsMobileDropdownVisible(false)}>
            <div className='p-2 font-bold hover:bg-yellow-700 hover:cursor-pointer text-white'>
              Products
            </div>
          </Link>
          {Object.keys(auth.userData).length > 0 ? (
            <>
              <div className="p-2">
                <hr className='text-gray-400' />
              </div>
              <Link href="/users/orders" onClick={() => setIsMobileDropdownVisible(false)}>
                <div className='p-2 font-bold hover:bg-yellow-700 hover:cursor-pointer text-white'>
                  Orders
                </div>
              </Link>
              <Link href="/users/profile" onClick={() => setIsMobileDropdownVisible(false)}><div className='p-2 font-bold hover:bg-yellow-700 hover:cursor-pointer text-white'>Profile</div></Link>
              <Link href="/users/logout" onClick={() => setIsMobileDropdownVisible(false)}><div className='p-2 font-bold hover:bg-yellow-700 hover:cursor-pointer text-white'>Logout</div></Link>
            </>
          ) : (
            <>
              <Link href="/users/register" onClick={() => setIsMobileDropdownVisible(false)}><div className='p-2 font-bold hover:bg-yellow-700 hover:cursor-pointer text-white'>Sign Up  </div></Link>
              <Link href="/users/login" onClick={() => setIsMobileDropdownVisible(false)}><div className='p-2 font-bold hover:bg-yellow-700 hover:cursor-pointer text-white'>Login</div></Link>
            </>
          )} 
        </div>
        <div className="hidden md:flex justify-between items-center"> 
          <div className='text-white text-3xl px-3 font-bold text-shadow-xl italic'>
            <Image src="/logo.png" width="100" height="100" className='w-10' alt="Logo"></Image>
          </div>
          <div className='flex gap-5 transition-color duration-700'>
            <div className='p-2 font-bold hover:bg-yellow-700 hover:cursor-pointer rounded-lg text-white transition-all duration-500'>
              <Link href="/">
                Home
              </Link>
            </div>
            <div className='p-2 font-bold hover:bg-yellow-700 hover:cursor-pointer rounded-lg text-white transition-all duration-500'>
              <Link href="/products">
                Products
              </Link>
            </div>
            <div className='p-2 font-bold hover:bg-yellow-700 hover:cursor-pointer rounded-lg text-white transition-all duration-500'>
              <Link href="/about-us">
                About Us
              </Link>
            </div>
          </div>
          <div className='flex gap-5 items-center p-2 transition-color duration-700'>
            {Object.keys(auth.userData).length > 0 ? (
              <>
                <div>
                  <Link href="/users/cart" onClick={() => setIsMobileDropdownVisible(false)}>
                    <div className='p-2 font-bold hover:bg-yellow-700 hover:cursor-pointer text-white'>
                      <FontAwesomeIcon icon={faCartArrowDown} className='text-white px-2' />
                      Cart
                    </div>
                  </Link>
                </div>
                <FontAwesomeIcon icon={faUserCircle} onClick={() => setIsProfileDropDownMenu(prev=>!prev)} className='text-2xl hover:cursor-pointer text-white  ' />
                <div ref={profileMenuRef} className={`${isProfileDropDownMenu? 'fixed':'hidden'} z-10 w-30 mt-40 right-4`}>
                  <Link href="/users/orders">
                    <div className='p-2 font-bold hover:bg-yellow-700 hover:cursor-pointer bg-neutral-900 text-white'>
                      Orders
                    </div>
                  </Link>
                  <Link href="/users/profile"><div className='p-2 hover:bg-yellow-700 font-bold hover:cursor-pointer bg-neutral-900 text-white transition-all duration-500'>Profile</div></Link>
                  <Link href="/users/logout"><div className='p-2 hover:bg-yellow-700 font-bold hover:cursor-pointer bg-neutral-900 text-white transition-all duration-500'>Logout</div></Link>
                </div>
              </>
            ) : (
              <>
                <div className='p-2 font-bold hover:bg-yellow-700 hover:cursor-pointer rounded-lg text-white transition-all duration-500'><Link href="/users/register">Sign Up</Link></div>
                <div className='p-2 font-bold hover:bg-yellow-700 hover:cursor-pointer rounded-lg text-white transition-all duration-500'><Link href="/users/login">Login</Link></div>
              </>
            )}
          </div>
        </div>
      </div>
    );
}
