const SqliteConnect = require('../dados/connect')
const Sqlz = require('sequelize')


const Usuario = SqliteConnect.define('usuario', {


    login: {
        type: Sqlz.STRING,  
        unique: true,
        allowNull: false,

    },

    senha: {
        type: Sqlz.STRING,
        allowNull: false,

    },

    id: {
        type: Sqlz.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,

    },
})

module.exports = Usuario