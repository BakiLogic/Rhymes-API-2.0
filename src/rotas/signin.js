const Usuario = require('../models/usuario') 
const {signinCheck} = require("../middlewares/checkInput.js")
const Jwtoken = require('jsonwebtoken')
const xpr = require("express")
const router = xpr.Router()
const bc = require('bcrypt')
const winston = require('winston')


router.post("/signin", signinCheck, async (req, res) => {
    const { login, senha } = req.body
    logsInput.info('Tentativa: ' + login)
    try {
        const ver = await Usuario.findOne({ login })

        if (ver) {
            input = String(ver.senha)
            const check = bc.compare(senha, input)
            if (check) {
             const jwtoken = Jwtoken.sign({ login: ver.login }, 'stoken', {expiresIn: "24h"})
             logsInput.info('confirmed: ' + login)
             res.status(200).json({ status: true, jwtoken: jwtoken });
            } else {
                logsInput.info('failed entry: ' + login)
                res.status(401).json({ status: false, message: "ERRO, senha errada!" });
            }
        } else {
          res.status(401).json({ status: false});
        }
    } catch (error) {
        res.status(500).json({tf: false,message: error,});
    }
});

const logsInput = winston.createLogger({
    format: winston.format.json(), level: "info",
    transports: [new winston.transports.File({ filename: "../logsFolder/loginFail.log", level: "error" }),
        new winston.transports.File({ filename: "../logsFolder/loginLogs.log" }),      
    ],
})

module.exports = router;