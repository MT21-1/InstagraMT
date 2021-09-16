import React, { useState, useEffect } from 'react'
import './style.scss'
export default function Toggle(){
    const [theme, setTheme] = useState(localStorage.getItem("theme") == ""? "light": localStorage.getItem("theme"))
    console.log("theme =" + theme)
    const toggleTheme = () => {
        document.body.classList.toggle("dark")
        if(theme == "light"){
            setTheme("dark")
            localStorage.setItem("theme", "dark")
        }else{
            setTheme("light")
            localStorage.setItem("theme", "light")
        }
    }

    useEffect(()=>{
        if(theme == "dark"){
            toggleTheme()
        }
    }, [])
    
   

    return(
        <button onClick={toggleTheme} className="toggle">
            {(theme == "light")? 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>: 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>}
            
      </button>
    )
}