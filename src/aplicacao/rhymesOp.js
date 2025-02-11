const Rhyme = require('../models/rhyme')


module.exports = {

    buscaKeyword: async (word) => {
        const rhymeWord = await Rhyme.findOne({where: {palavraChave: word}})

        if (rhymeWord) {

            return {tf: true, rhymeWord: rhymeWord}
        } else {

            return {tf:false}
        }  
    },

    add: async (params) => {        
        try {
            if (validação(params)) {
                const newRhyme = await Rhyme.create(params)
                return {tf: true, rhyme: newRhyme}

            } else {
                return validação(params)
            }
        } catch (error) {
            return error
        }
    },

    
}
function validação(params) {

    if (!params.palavraChave || !dados.rhymeList) {
        return false
    } else {
        return true
    }
}