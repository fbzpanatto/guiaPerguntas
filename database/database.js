const Sequelize = require('sequelize')

const connection = new Sequelize('guiaperguntas', 'root', 'fnp181292', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
})

module.exports = connection