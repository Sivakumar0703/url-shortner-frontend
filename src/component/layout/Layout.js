import React from 'react'
import Header from '../header/Header'
import Sidenav from '../sidenav/Sidenav'

const Layout = ({children}) => {
  return (
    <div>
       <Header />
       <Sidenav />
       {children}

    </div>
  )
}

export default Layout