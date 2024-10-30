
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://BUxa:2780027800rtx@perelswork.bcv8n.mongodb.net/?retryWrites=true&w=majority&appName=PerelsWork";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    let objeto = {teste: "Teste", x: 10};
    await client.db("TP2").collection("teste2").insertOne(objeto);
    console.log("Salvou?");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
