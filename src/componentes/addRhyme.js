import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {getJWToken} from "../middlewares/generalAut"
import axios from "axios"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

function AddRhyme() {
    const navigate = useNavigate()
    const [palavraChave, setPalavraChave] = useState("")
    const [rhymeList, setRhymeList] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {const jwToken = getJWToken()
        if (!jwToken) {
            navigate("/")
            console.log("must have an available token")
        } else {
            setIsLoading(false)
        }
    }, [navigate])
    const submitCheck = async (e) => {e.preventDefault();
        const newRhyme = {palavraChave,rhymeList};
    try {
        const jwToken = getJWToken()
        const rhymeTF = await axios.post('https://localhost:3001/rhymeAdd', newRhyme, {headers: {'Authorization': `${jwToken}`}})

        if (rhymeTF.tf) {
            console.log("sucesso ao adicionar rima")
            navigate("/mainMenu")
        }
    } catch (error) {
        console.error("Erro ao adicionar rima:", error)
    }
    setPalavraChave("")
    setRhymeList("")
  }

  const escape = () => {
    navigate('/title');
  };

    return (
        <div style={{ color: "linear-gradient(135deg #0f2027, #203a43, #2c5364)",margin: "0 auto", alignContent:"center",maxWidth: "300px", height:"90%",  padding: "20px", border: "1px solid #ccc", borderRadius: "5px"}}>
            <div className= "BlockSignin"style={{alignContent:"center"}}>
            <Form onSubmit={submitCheck} style={{alignContent:"center", marginLeft:'25%'}}>
            <div style={{ marginBottom: "15px" }}>
                <Form.Label htmlFor="palavraChave">Palavra..:</Form.Label>
                <Form.Control id="name" value={palavraChave} onChange={(e) => setPalavraChave(e.target.value)} required style={{padding: "8px", boxSizing: "border-box" }}/>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <Form.Label htmlFor="rhymeList">Lista de Rimas..:</Form.Label>
            <Form.Control id="description" value={rhymeList} onChange={(e) => setRhymeList(e.target.value)} required style={{padding: "8px", boxSizing: "border-box" }}/>
          </div>
          
          <Button type="submit" style={{ padding: "10px 15px", backgroundColor: "blue", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Add</Button>
          <Button onClick={escape} style={{ margin:"10px", padding: "10px 15px", backgroundColor: "red", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Escape</Button>
        </Form>
        </div>
      </div>
    )
}

export default AddRhyme