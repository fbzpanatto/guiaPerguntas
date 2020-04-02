const { DataTypes } = require('sequelize')
const connection = require('./database')
const Pergunta = require('./Pergunta')

const Resposta = connection.define('respostas', {
  corpo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  perguntaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pergunta,
      key: 'id'
    }
  }
})

Resposta.sync({force: false})

module.exports = Resposta