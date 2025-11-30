const { MongoClient } = require("mongodb");

const MONGO_URI = "mongodb://localhost:27017";
const DB_NAME = "trabalho_final_bd";

let client;
let db;

async function connectMongo() {
  if (db) return db;

  client = await MongoClient.connect(MONGO_URI);
  db = client.db(DB_NAME);

  console.log("📦 MongoDB conectado com sucesso");
  return db;
}

module.exports = { connectMongo };
