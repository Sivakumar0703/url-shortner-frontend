import React from 'react'
import {FaAngleRight , FaAngleLeft , FaSignOutAlt ,FaThLarge , FaChartBar , FaShoppingCart , FaBars} from "react-icons/fa"
import { NavLink } from 'react-router-dom'
import "../sidenav/sidenav.css"

const Sidenav = ({showNav , setShowNav}) => {
  return (
    <>
     
     <div className='mobile-nav'>
        <button className='mobile-nav-btn' onClick={()=>setShowNav(!showNav)}>
           <FaBars size={25} />
        </button>

     </div>

    <nav className={showNav ? "" : "sidenav"}>

        <button className="nav-btn" type='button' onClick={()=>setShowNav(!showNav)}>
            {
             showNav ? <FaAngleLeft size={30}/> : <FaAngleRight size={30} />   
            }
        </button>

        <div>
            <NavLink to="/" className="logo">
                {/* <img src={require("")} alt="logo" /> */}

            </NavLink>
       
            <div className='nav-top'>
            <NavLink className="nav-link">
                <FaThLarge size={30} />
                <span> Dashboard </span>
            </NavLink>

            <NavLink className="nav-link">
                <FaChartBar size={30} />
                <span> Chart </span>
            </NavLink>

            <NavLink className="nav-link">
                 <FaShoppingCart size={30} />
                 <span> Cart </span>
            </NavLink>

        </div>

        </div>

        

        <div>
           <NavLink to="/" className="nav-link">
              <FaSignOutAlt size={30} />
              <span> sign out </span>
           </NavLink>
        </div>

    </nav>
    </>
  )
}

export default Sidenav