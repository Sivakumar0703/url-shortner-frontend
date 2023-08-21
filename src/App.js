
import './App.css';
import "./index.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidenav from "./component/sidenav/Sidenav";
import { useState } from 'react';

function App() {

const [showNav , setShowNav] = useState(false)

  return (
    <div className="App">
      
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Sidenav showNav={showNav} setShowNav={setShowNav} className={!showNav ? "page" : "page page-with-navbar"} />} />
      {/* <Route path='/sidenav' element={<Sidenav showNav={showNav} setShowNav={setShowNav} />} /> */}
        
 {/* className={!showNav ? "page" : "page page-with-navbar"} */}
    </Routes>
    </BrowserRouter>
      
    </div>
  );
}


export default App;
