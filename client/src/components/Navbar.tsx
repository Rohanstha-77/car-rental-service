"use client"
import { assets, menuLinks } from '@/config/assets'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Navbar = ({status} : sessionStatus) => {
    const pathName = usePathname()
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleLoginAndLogout = () => {
        if(status === "authenticated"){
            signOut({callbackUrl: "/"})
        }else{
            router.push("/signin")
        }
    }

  return (
    <div className= {`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all ${pathName === "/" && "bg-light"}`}>
        <Link href={"/"}>
            <Image src={assets.logo} width={200} height={200} alt='logo'/>
        </Link>

        <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 max-sm:p-4 duration-300 z-50 ${pathName === "/" ? "bg-primaryColor" : "bg-white"} ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>
            {menuLinks.map( (link, index) => (
                <Link key={index} href={link.path}>{link.name}</Link>
            ))}

            <div className='hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56'>
                <input type="text" className='py-1.5 w-full bg-transparent outline-none placeholder-gray-500' placeholder='Search' />
                <Image src={assets.search_icon} alt='search'/>
            </div>

            <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>
                <button className='cursor-pointer'>Dashbord</button>
                <button onClick={() => handleLoginAndLogout()} className='cursor-pointer px-8 py-2 bg-blue-500 hover:bg-blue-600 transition-all text-white rounded-lg'>{status === "authenticated" ? "Logout" : "Login"}</button>
            </div>

        </div>

        <button className='sm:hidden cursor-pointer' onClick={() => setOpen(!open)}>
            <Image src={open ? assets.close_icon : assets.menu_icon} alt='menu'/>
        </button>
    </div>
    
  )
}

export default Navbar