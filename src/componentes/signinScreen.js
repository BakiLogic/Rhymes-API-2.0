import { useNavigate } from "react-router-dom"
import {signinCheck} from "../middlewares/checkInput"
import Form from 'react-bootstrap/Form';
import React, { useState } from "react"


function SignIn() {

    const navigate = useNavigate()
    const [login, setLogin] = useState("")
    const [senha, setSenha] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await signinCheck(login, senha)
            navigate("/titleScreen")
            setErrorMessage("")
        } catch (e) {
            console.log(e)
            setErrorMessage("Input error.")
        }
  };

  return (
    <div style={{ color: "linear-gradient(135deg #0f2027, #203a43, #2c5364)",margin: "0 auto", alignContent:"center",maxWidth: "300px", height:"90%",  padding: "20px", border: "1px solid #ccc", borderRadius: "5px"}}>
      <Form onSubmit={handleLogin} style={{alignContent:"center"}}>     
        <Form.Label htmlFor="login">Nome</Form.Label>
          <Form.Control id="login" value={login} onChange={(e) => setLogin(e.target.value)} required  />
        
        <div style={{ marginBottom: "10px" }}>
          <Form.Label htmlFor="senha">Senha:</Form.Label>
          <Form.Control type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit" style={{ padding: "10px 15px", backgroundColor: "blue", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>---</button>
      </Form>
    </div>
  );
}

export default SignIn;