const Jwt = require('jsonwebtoken')


const auth = (req, res, next) => {
    const jwtoken = req.headers.authorization
    if (jwtoken) {
        Jwt.verify(jwtoken, 'secret', (err) => { if (err) {
                return res.status(401).json({ 
                    status: false, error: 'invalid token' 
                })
        }next()})
    } else {
        return res.status(401).json({ 
            status: false, error: 'no token found' 
        })
    }
}

module.exports = auth