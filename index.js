const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
const DB_PASS = process.env.DB_PASS;
const DB_USER = process.env.DB_USER;
const port = 3000;

let dbJSON = [];

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@teachers.gc04dw7.mongodb.net/?appName=Teachers`;
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
    const database = client.db("Teachers");
    const chrissy = database.collection("Chris Peters");
    dbJSON = await chrissy.find().toArray();
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.use('/web', express.static('./src'));

app.get('/', (req, res) => {
  res.json(dbJSON);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});