const rhymeOp = require('../aplicacao/rhymesOp')
const auToken = require('../middlewares/jwtAut.js')
const Rhyme = require('../models/rhyme') 
const {rhymeCheck} = require("../middlewares/checkInput.js")
const xpr = require("express")
const router = xpr.Router()
const winston = require('winston')
const apicache = require('apicache')
let cache = apicache.middleware


router.post("/rhymeAdd", auToken, rhymeCheck, async (req, res) => {
    try {
        const log = `${req.method} ${req.originalUrl}`
        apiLog.info(log)

        const rhymeAddTF = await rhymeOp.add(req.body)

        if (rhymeAddTF.tf) {
            res.status(201).send({ tf: true, Rhyme: rhymeAddTF })
        } else {
            res.status(200).send(rhymeAddTF)
        }
    } catch (e) {
        res.status(500).send({ e })
    }
})
router.get('/rhymeSearch/:palavraChave', auToken, cache('300 seconds'), async (req, res) => {
    try {
        const log = `${req.method} ${req.originalUrl}`
        apiLog.info(log)
        const rhymeSearchTF = await rhymeOp.buscaKeyword(req.params.palavraChave)
        if (rhymeSearchTF.status) {
            res.status(201).json({ rhyme: rhymeSearchTF })
        } else {
            res.status(400).json({ rhyme: rhymeSearchTF })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'search error' })
    }
})

const apiLog = winston.createLogger({
    format: winston.format.json(),level: "info",
    transports: [new winston.transports.File({ filename: "../logs/apiFail.log", level: "error" }),
        new winston.transports.File({ filename: "../logs/apiLogs.log" }),
    ],
})

module.exports = router