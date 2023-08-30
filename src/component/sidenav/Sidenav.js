import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import {FaAngleRight , FaAngleLeft , FaSignOutAlt , FaBars, FaArrowCircleRight, FaUserPlus ,  FaLink, FaTable, FaChartLine} from "react-icons/fa"
import { NavLink, useNavigate } from 'react-router-dom'
import "../sidenav/sidenav.css"
import "../../index.css"

const Sidenav = () => {
    const [showNav , setShowNav] = useState(false)
    const navigate = useNavigate()
    const menuRef = useRef();
    const user = JSON.parse(localStorage.getItem("user"))?.email;
  
 // logout function
 const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cartArray');
    navigate('/')
  }

 

  // to hide the side nav when user click anywhere on the screen
  useEffect(()=>{

    const handler = (e) => {
        if(!menuRef.current.contains(e.target)){
            setShowNav(false)
        }
    }

    document.addEventListener("mousedown" , handler)

    return ()=>{
        document.removeEventListener("mousedown" , handler)
    }

  },[])

  return (
    <div className={!showNav ? "page" : "page page-with-navbar"}>
     
     <div className='mobile-nav' >
        <button className='mobile-nav-btn' onClick={()=>setShowNav(!showNav)} >
           <FaBars size={25} />
        </button>
     </div>

    <nav className={showNav ? "" : "sidenav"} ref={menuRef} >

        <button className="nav-btn" type='button' onClick={()=>setShowNav(!showNav)}>
            {
             showNav ? <FaAngleLeft size={30}/> : <FaAngleRight size={30} />   
            }
        </button>

        <div>
            <NavLink to="/" className="logo mb-2">
                <img src={require("./nav-image.webp")} alt="logo" />
            </NavLink>

            {
                !user ? (
                    <NavLink to="/login" className="nav-link">
              <FaArrowCircleRight size={30} />
              <span> Login </span>
           </NavLink>
                ) : ''
            }

           {
            !user ? (
                <NavLink to="/sign-up" className="nav-link">
                <FaUserPlus size={30} />
                <span> Sign-up </span>
             </NavLink>
            ) : ''
           }
       
            <div className='nav-top'>
            <NavLink to="/" className="nav-link">
                <FaChartLine size={30} />
                <span> Dashboard </span>
            </NavLink>

            <NavLink to="/url_shortner" className="nav-link">
                <FaLink size={30} />
                <span> URL </span>
            </NavLink>

            <NavLink to="/url_list" className="nav-link">
                 <FaTable size={30} />
                 <span> Url List </span>
            </NavLink>

        </div>

        </div>
  

        <div>
           {
            user ? (
                <NavLink  className="nav-link" onClick={logout}>
              <FaSignOutAlt size={30} />
              <span> sign out </span>
           </NavLink>
            ) : ''
           }
        </div>

    </nav>
    </div>
  )
}

export default Sidenav