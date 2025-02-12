const xpr = require('express')
const fs = require('fs')
const cors = require("cors")
const app = express()
const crtfcd = fs.readFileSync("../certificados/crtfcd.pem", "utf8")
const pk = fs.readFileSync("../certificados/chave.pem", "utf8")
const credenciais = { key: pk, cert: crtfcd }
const https = require('https')
const sqliteBank = require('../dados/connect.js')
const servHttps = https.createServer(credenciais, app)
const port = 3001


sqliteBank.aut().then(() => {
    console.log("bd connected")
}).catch(err => {
    console.log("Error", err)
})

app.use(cors())
app.use(xpr.json())
app.use('/', require('./routes/start'))
app.use('/', require('./routes/signin'))
app.use('/', require('./routes/rhyme'))
app.get('/', (req, res) => {
    res.send('hello world')
});

servHttps.listen(port, function() {
    console.log('Server port:' + port)
})