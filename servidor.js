const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

const cors = require("cors");
app.use(cors());

let vetorNomes = []
if (fs.existsSync('usuario.json')) {
  const dados = fs.readFileSync('usuario.json', 'utf-8')
  console.log(dados);
  vetorNomes = JSON.parse(dados)
}


app.get("/", (req, res) => {
  res.render("index");
  //res.redirect (Redireciona para outra pagina)
});

app.get("/informacoes", (req, res) => {
  res.render("partials/informacoes");
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

app.post('/pedirDadosdoUsuario', (req, res) => {
  let nomeNoForm = req.body.nome
  let sobrenomeNoForm = req.body.sobrenome
  let telefoneNoForm = req.body.telefone
  let cadastro = {
    'nome': nomeNoForm,
    'sobrenome': sobrenomeNoForm,
    'telefone': telefoneNoForm,
  }
  console.log(cadastro);
  console.log('\n' + JSON.stringify(cadastro) + ',');
  vetorNomes.push(cadastro)
  fs.writeFileSync('usuario.json', JSON.stringify(vetorNomes))
  res.redirect('/informacoes')
})

app.get('/mostrar', (req, res) => {
  content = JSON.parse(fs.readFileSync('usuario.json', 'utf8'))
  res.render('result', { vetorNomes })
})

const port = 3000; //mudar para 3000 pro glitch
app.listen(port, () => console.log("Servidor funcionando na porta: ", port));
