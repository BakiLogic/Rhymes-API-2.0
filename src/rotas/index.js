const xpr = require('express')
const fs = require('fs')
const cors = require("cors")
const app = xpr()

const crtfcd = fs.readFileSync("../certificados/cert.pem", "utf8")
const pk = fs.readFileSync("../certificados/key.pem", "utf8")
const credenciais = { key: pk, cert: crtfcd }
const https = require('https')
const bd = require('../dados/connect')
const servHttps = https.createServer(credenciais, app)
const port = 3001
app.use(cors())

bd.authenticate().then(() => {
    console.log("bd connected")
}).catch(err => {
    console.log("Error", err)
})


app.use(xpr.json())
app.use('/', require('./install'))
app.use('/', require('./signin'))
app.use('/', require('./rhyme'))
app.get('/', (req, res) => {
    res.send('hello world')
});

servHttps.listen(port, function() {
    console.log('Server port:' + port)
})