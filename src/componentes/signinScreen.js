import { useNavigate } from "react-router-dom"
import {loginToken} from "../middlewares/generalAut"
import Form from 'react-bootstrap/Form';
import React, { useState } from "react"
import Button from 'react-bootstrap/Button'

function SignIn() {

    const navigate = useNavigate()
    const [login, setLogin] = useState("")
    const [senha, setSenha] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const loginCheck = async (e) => {
        e.preventDefault()
        try {
            await loginToken(login, senha)
            navigate("/title")
            setErrorMessage("")
        } catch (e) {
            console.log(e)
            setErrorMessage("Input error.")
           
        }
  };

  return (
    <div style={{ color: "linear-gradient(135deg #0f2027, #203a43, #2c5364)",margin: "0 auto", alignContent:"center",maxWidth: "400px", height:"90%",  padding: "20px", border: "1px solid #ccc", borderRadius: "5px"}}>
    <div className= "BlockSignin"style={{alignContent:"center"}}>
      <Form onSubmit={loginCheck} style={{alignContent:"center", marginLeft:'25%'}}>     
        <Form.Label htmlFor="login">Nome..:</Form.Label>
          <Form.Control id="login" value={login} onChange={(e) => setLogin(e.target.value)} required  />
        
        <div style={{ marginBottom: "10px" }}>
          <Form.Label htmlFor="senha">Senha.:</Form.Label>
          <Form.Control type="senha" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Button type="submit" style={{ padding: "10px 15px", backgroundColor: "blue", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>---</Button>
      </Form>
      </div>
    </div>
  );
}

export default SignIn;