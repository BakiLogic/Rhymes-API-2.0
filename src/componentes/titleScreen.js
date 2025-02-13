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
      <div className="mainbox" style={{ textAlign: "center", marginTop: "5%" }}>
        <h1> Rhyme API </h1>
        <ul style={{ listStyleType: "none", padding: 0 }}>
            <li style={{ marginBottom: "10px" }}>
              <Button onClick={() => routeMenu(0)} style={{ padding: "10px 15px", backgroundColor: "#28A745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Add a Rhyme</Button>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <Button onClick={() => routeMenu(1)} style={{ padding: "10px 15px", backgroundColor: "#17A2B8", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Buscar gatos</Button>
          </li>
        </ul>
      </div>
    );
}

export default Title