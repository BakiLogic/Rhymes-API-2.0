import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {getJWToken} from "../middlewares/generalAut.js"
import axios from "axios"
import Resultados from './searchResult'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'


function SearchCat() {
    const [palavraChave, setPalavraChave] = useState("")
    const [rhymeList, setRhymeList] = useState(null)
    const [error, setError] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const jwToken = getJWToken()
        if (!jwToken) {
            navigate("/")
        } else {
            setIsLoading(false)
        }
    }, [navigate])

    const submitCheck = async (e) => {
        e.preventDefault()

        try {
            const jwToken = getJWToken()
            console.log(jwToken)

            const response = await axios.get(`https://localhost:3001//rhymeSearch/${palavraChave}`, {
                headers: { 'Authorization': `${jwToken}` }
            })

            setRhymeList(response.rhymeList.rhyme.rhyme)
            setError(0)
            setErrorMessage('')
        } catch (error) {
            console.log(error)
            setError(1)
            setRhymeList(null)
            setErrorMessage(error.response?.rhymeList?.palavraChave?.mensagem || "Erro desconhecido")
        }
        setPalavraChave("")
    }

    const escape = () => {
        navigate('/title');
      };

    if (isLoading) {
        return <div>loading..:</div>
    }

    return (
        <div style={{ color: "linear-gradient(135deg #0f2027, #203a43, #2c5364)",margin: "0 auto", alignContent:"center",maxWidth: "300px", height:"90%",  padding: "20px", border: "1px solid #ccc", borderRadius: "5px"}}>
            <Form onSubmit={submitCheck}>
                <div style={{ marginBottom: "15px" }}>
                    <Form.Label htmlFor="palavraChave">keyword..:</Form.Label>
                    <Form.Control id="palavraChave" value={palavraChave} onChange={(e) => setPalavraChave(e.target.value)} required style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}/>
                </div>
                <Button type="submit" style={{ padding: "10px 15px", backgroundColor: "blue", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>---</Button>
                <Button onClick={escape} style={{ margin:"10px", padding: "10px 15px", backgroundColor: "red", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Escape</Button>
            </Form>

            {/* Renderiza o componente Results se catData estiver disponível */}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {rhymeList && <Resultados rhymeList={rhymeList} error={error} />}
        </div>
    )
}

export default SearchCat