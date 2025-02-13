const xpr = require("express")
const router = xpr.Router() 
const User = require('../models/usuario')
const bc = require("bcrypt")


router.get("/install", async (req, res) => {

    try { 
        const hiddenPassword = await bc.hash('asdf', 15)

        account1 = {"login": "user1",
            "senha": hiddenPassword,}

        await User.create({login: 'user1', senha: 'asdf'});
        res.status(200).json({msg: "BD init"})
    } catch (error) {
        res.status(500).json({msg: error})
    }
});

module.exports = router;