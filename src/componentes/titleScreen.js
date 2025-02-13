import {useNavigate} from "react-router-dom"
import React, { useState, useEffect } from "react"
import {getJWToken} from "../middlewares/generalAut"
import Button from 'react-bootstrap/Button'

function Title() {
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        const token = getJWToken()
        if (!token) {
            navigate("/")
        } else {
            setIsLoading(false)
        }
    }, [navigate])


    const routeMenu = (route) => {
        if (route === 'add') {
            navigate("/AddRhyme")
        } else if (route === 'search') {
            navigate("/SearchResult")
        }
    }

  return (
      <div className="mainbox" style={{ alignContent:"center", width:"40%", marginLeft:"30%"}}>
      
        <h1 style={{padding: 0, alignContent:'center', marginLeft:'42%', marginTop:'-20%'}}> Rhyme API </h1>
        <ul style={{ listStyleType: "none", padding: 0, alignContent:'center', marginLeft:'45%', marginTop:'15px'}}>
            <li style={{ marginBottom: "10px" }}>
              <Button onClick={() => routeMenu(0)} style={{ padding: "10px 15px", backgroundColor: "red", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Add a Rhyme</Button>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <Button onClick={() => routeMenu(1)} style={{ padding: "10px 15px", backgroundColor: "blue", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Buscar rimas</Button>
          </li>
        </ul>
      </div>
    );
}

export default Title