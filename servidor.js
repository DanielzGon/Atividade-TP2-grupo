const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://diego:pivete@perelswork.bcv8n.mongodb.net/?retryWrites=true&w=majority&appName=PerelsWork";

// Criação do MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

const cors = require("cors");
app.use(cors());

let vetorNomes = [];

async function connectToDB() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB", error);
  }
}

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/informacoes", (req, res) => {
  res.render("partials/informacoes");
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

// Recebe os dados do formulário e salva no MongoDB
app.post('/pedirDadosdoUsuario', async (req, res) => {
  let nomeNoForm = req.body.nome;
  let sobrenomeNoForm = req.body.sobrenome;
  let telefoneNoForm = req.body.telefone;
  let cadastro = {
    nome: nomeNoForm,
    sobrenome: sobrenomeNoForm,
    telefone: telefoneNoForm,
  };
  console.log(cadastro);
  
  try {
    // Conectar ao MongoDB
    await client.connect();
    const db = client.db("fome");  // Nome do banco de dados
    const collection = db.collection("pessoas");  // Nome da coleção

    // Inserir dados na coleção
    await collection.insertOne(cadastro);
    console.log("Cadastro salvo com sucesso no MongoDB!");

  } catch (error) {
    console.error("Erro ao salvar dados no MongoDB", error);
  } finally {
    // Fechar a conexão com o banco
    await client.close();
  }

  res.redirect('/informacoes');
});

// Rota para mostrar os dados cadastrados
app.get('/mostrar', async (req, res) => {
  try {
    // Conectar ao MongoDB
    await client.connect();
    const db = client.db("fome");
    const collection = db.collection("pessoas");

    // Recuperar todos os dados da coleção
    const vetorNomes = await collection.find({}).toArray();
    res.render('result', { vetorNomes });
  } catch (error) {
    console.error("Erro ao recuperar dados do MongoDB", error);
    res.status(500).send("Erro ao recuperar dados do banco de dados.");
  } finally {
    await client.close();
  }
});

const port = 3000;
app.listen(port, () => console.log("Servidor funcionando na porta:", port));

// Conectar ao banco de dados ao iniciar o servidor
connectToDB();
