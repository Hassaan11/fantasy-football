import Image from 'next/image'
import React from 'react'

const Navbar = () => {
   return (
      <div className="flex items-center gap-3 p-4 border-b border-neutral-800 bg-black">
         <Image
            src="/logo.jpeg"
            alt="Football"
            width={48}
            height={48}
            className="rounded-full"
         />
         <h1 className="text-xl font-medium">Fantasy Football</h1>
      </div>

   )
}

export default Navbar