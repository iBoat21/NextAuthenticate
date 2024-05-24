"use client"

import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'


const RegisterPage = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const { data: session } = useSession();
    if(session) redirect ("/welcome")

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (password != confirmPassword){
            setError("Password do not match!");
            return;
        }

        if (!name || !email || !password || !confirmPassword) {
            setError("please complete all inputs!");
            return
        }

        try{
            const res = await fetch("http://localhost:3000/api/register",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            })
            if(res.ok){
                const form = e.target;
                setError("");
                form.reset();
            }else{
                console.log("User registration failed.")
            }

        }catch(error){
            console.log("Error During Registration",error)
        }
    }

  return (
    <div>
        <Navbar />
        <div className='container mx-auto'>
            <h3 className='pt-5'>Register Page</h3>
            <hr className="my-5" />
            <form onSubmit={handleSubmit}>

                {error && (
                    <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                        {error}
                    </div>
                )}
                    <input onChange={(e) => setName(e.target.value)} className='block bg-gray-300 p-2 my-2 rounded-md' type="text" placeholder='Enter your name'/>
                    <input onChange={(e) => setEmail(e.target.value)} className='block bg-gray-300 p-2 my-2 rounded-md' type="email" placeholder='Enter your email'/>
                    <input onChange={(e) => setPassword(e.target.value)} className='block bg-gray-300 p-2 my-2 rounded-md' type="password" placeholder='Enter your password'/>
                    <input onChange={(e) => setConfirmPassword(e.target.value)} className='block bg-gray-300 p-2 my-2 rounded-md' type="password" placeholder='Confirm your password'/>
                    <button className='bg-green-500 p-2 rounded-md text-white' type="submit">Sign Up</button>
            </form>
            <hr className="my-5" />
            <p>Have an account ? go to 
                <Link className="text-blue-500 hover:underline" href="/login"> Login </Link>
                Page
            </p>    
        </div>        
    </div>
  )
}

export default RegisterPage
