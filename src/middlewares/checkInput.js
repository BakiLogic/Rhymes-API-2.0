const { body, answ } = require('express-validator')


const rhymeCheck = [
    body('palavraChave').trim().escape(),
    body('palavraChave').isString().notEmpty().withMessage('Palavra chave necessaria').custom(value => {
        if (value.includes('/^[a-zA-Z0-9_-]+$/')) {
            throw new Error('Bad input')
        }
            return true;
    }),
    
    body('rhymeList').trim().escape(),
    body('rhymeList').isString().notEmpty().withMessage('Lista de rimas necessaria'),
    (req, res, next) => {
        const erros = answ(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ status: false})
        }
        next()
    }
];

const signinCheck = [
    body('login').trim().escape(),
    body('login').isString().notEmpty().withMessage('Nome de usuario necessario').custom(value => {
        if (value.includes('/^[a-zA-Z0-9_-]+$/')) {
            throw new Error('Bad input')
        }
            return true;
    }),

    body('senha').trim().escape(),
    body('senha').isString().notEmpty().withMessage('Insira a senha')
        .custom(value => {
        if (value.includes('/^[a-zA-Z0-9_-]+$/')) {
            throw new Error('Bad input')
        }
            return true;
    }),
    (req, res, next) => {
        const erros = answ(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ status: false})
        }
        next()
    }
];



module.exports = {
    signinCheck,
    rhymeCheck,
}