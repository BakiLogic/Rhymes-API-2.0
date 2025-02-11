import axs from "axios"


export const getJWToken = () => {

    const jwtoken = localStorage.getItem('token')
    return jwtoken || null
    
}

export const loginToken = async (nome, senha) => {
    try {

        const answ = await axs.post('https://localhost:3001/signin', {nome, senha})
        const jwtoken = answ.data.token

        localStorage.setItem('token', jwtoken)

        return answ.data

    } catch (err) {

        if (err.answ && err.answ.status === 429) {
          throw new Error('Timeout');
        } else {
          throw new Error('Not Found');
        }

    }
}

