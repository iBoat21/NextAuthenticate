"use client"

import React from 'react'
import Navbar from '../components/Navbar'
import { useSession } from 'next-auth/react'

function WelcomePage() {

    const { data: session } = useSession();
    console.log(session)

  return (
    <div>
      <Navbar session={session} />
      <div className="container mx-auto mt-5">
        <h3 className="text-3xl">
            Welcome {session?.user?.name}
        </h3>
        <p>Email : {session?.user?.email}</p>
        <hr className="my-3" />
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam saepe minus hic delectus illo corporis. Recusandae saepe cumque reiciendis ad.</p>
      </div>
    </div>
  )
}

export default WelcomePage
