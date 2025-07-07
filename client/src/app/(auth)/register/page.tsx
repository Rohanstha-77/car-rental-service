"use client"
// import gmail_logo from "@/assets/icons8-google-96.png"
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'


const page = () => {
  const [email,setEmail] = useState("")
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async(event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append("username",username)
    formData.append("email",email)
    formData.append("password",password)

    const response = await axios.post("/api/auth/register", formData)

    if(response.data.success){
      toast.success(response.data.message)
      router.push("/signin")
    }else{
      toast.error(response.data.message)
    }
  }

  
  

  return (
    <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Welcome Fresher
            </h2>
            <form>
              <input
                id="username"
                className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
              <input
                id="email"
                className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                id="password"
                className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
             
              <div className="text-right py-4">
                <a className="text-blue-600 underline" href="#">
                  Forgot Password
                </a>
              </div>
              <button onClick={handleSubmit}
                type="submit"
                className="w-full mb-3 bg-indigo-500 py-2.5 rounded-full text-white"
                // onClick={handleSubmit}
              >
                Log in
              </button>
            </form>
            <p className="text-center mt-4">
              Already have an account{' '}
              <Link href="/signin" className="text-blue-500 underline">
                Log in
              </Link>
            </p>
            <button
              type="button"
              className="w-full flex items-center gap-2 justify-center mt-5 bg-black py-2.5 rounded-full text-white"
            //   onClick={handleLoginWithGoogle}
            >
              <Image
                className="h-6 w-6"
                width={30}
                height={30}
                src={"/assets/icons8-google-96.png"}
                alt="Logo"
              />
              Log in with Google
            </button>
          </div>
        </div>
  )
}

export default page



