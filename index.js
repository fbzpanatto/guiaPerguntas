const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')

// Database
connection
  .authenticate()
  .then(() => {
    console.log('Conexao feita com o banco de dados')
  })
  .catch((err) => {
    console.log(err)
  })

// use o EJS como view engine
app.set('view engine', 'ejs')
/**
 * Utilizar arquivos estaticos no backend
 * css, js do front-end, imagens, arquivos de dados
 * app.use(utilize algo...)
 * padrao pasta public
 */
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', async (req, res) => {
  Pergunta.findAll({ 
    raw: true,
    order: [
      ['id', 'DESC']
    ]
  })
      .then(perguntas => {
      res.render('index', {
        perguntas
      })
    })
})

app.get('/perguntar', (req, res) => {
  res.render('perguntar')
})

app.get('/pergunta/:id', async(req, res) => {
  const id = req.params.id
  Pergunta.findOne({
    where: {id :id}
  }).then(pergunta => {
    if(pergunta !=undefined){

      Resposta.findAll({
        where: {perguntaId: pergunta.id},
        order: [['id', 'DESC']]
      }).then(respostas => {
        res.render('pergunta', {
          pergunta: pergunta,
          respostas: respostas
        })
      })
    } else {
      res.redirect('/')
    }
  })
})

app.post('/salvarpergunta', async (req, res) => {
  await Pergunta.create({
    titulo: req.body.title,
    descricao: req.body.description
  })
  res.redirect('/')
})

app.post('/responder', async(req, res) => {
  const { corpo, perguntaId} = req.body
  console.log(corpo, perguntaId)
  await Resposta.create({
    perguntaId,
    corpo
  })
  res.redirect('/pergunta/'+perguntaId)
})
app.listen(8080, () => {
  console.log('App rodando...')
})