import React from 'react'
import { FcGraduationCap } from "react-icons/fc";



function Header() {
  return (
    <>
    <header className='app-header'>
      <p>
        <FcGraduationCap style={{fontSize: "150px", paddingBottom: "20px"}} /></p>
        <h1 >HOREN API QUIZ</h1>
        <p>Once you start do not refresh else you will loose you score.</p>
    </header> 

    
    </>
  )
}

export default Header;