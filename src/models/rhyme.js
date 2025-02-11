const SqliteConnect = require('../dados/connect')
const Sqlz = require('sequelize')


const Rhyme = SqliteConnect.define('rhyme', {

   palavraChave: {
        type: Sqlz.STRING,
        unique: true,
        allowNull: false,

    },

    rhymeList:{
        type: Sqlz.STRING,
        unique: true, 
        allowNull: false,

    },

    idRima: {
        type: Sqlz.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true, 
        allowNull: false, 
        
    },
})

module.exports = Rhyme