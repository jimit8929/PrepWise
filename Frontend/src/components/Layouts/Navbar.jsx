import React from 'react'
import ProfileInfoCard from "../Cards/ProfileInfoCard"
import { Link } from 'react-router-dom'
import Logo_Img from "../../assets/img_2.png"


const Navbar = () => {
  return (
    <div className='h-16 bg-white border border-b border-gray-200/50 backdrop-blur-[3px] py-2.5 px-4 md:px-20 sticky top-0 z-30'>
      <div className="container mx-auto flex items-center justify-between gap-5">
        <Link to="/dashboard">
        <div className='flex items-center gap-3'>
        <img src={Logo_Img} alt="" className='h-10 w-10 rounded-full'/>
        <h2 className='text-lg md:text-xl font-medium text-black leading-5'>PrepWise AI</h2>
        </div>
        </Link>

        <ProfileInfoCard/>
      </div>
    </div>
  )
}

export default Navbar