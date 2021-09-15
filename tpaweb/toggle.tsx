import React, { useState, useEffect } from 'react'

export default function Toggle(){
    const [dark, setDark] = useState(false);
    const theme = localStorage.getItem("theme")
    console.log(theme)
    
    const toggleTheme = () => {
        document.body.classList.toggle("dark")
        setDark(!dark)
        if(!dark){
            localStorage.setItem("theme", "dark")
        }else{
            localStorage.setItem("theme", "light")
        }
        console.log(localStorage.getItem("theme"))
    }

    useEffect(()=>{
        if(theme == "dark"){
            toggleTheme()
        }
    }, [])
    
   

    return(
        <button onClick={toggleTheme} className="toggle">Toggle</button>
    )
}