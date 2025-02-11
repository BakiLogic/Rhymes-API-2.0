const Sqlz = require('sequelize')


const sqlz = new Sqlz({

    dialect: 'sqlite',
    storage: '../dados/app.sqlite',
    pool: {min: 0,max: 7,acquire: 42000, idle: 9000}

})

module.exports = sqlz