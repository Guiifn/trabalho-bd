const { connectMongo } = require("./mongoClient");

async function getInterestsByClientId(idCliente) {
  const db = await connectMongo();
  const collection = db.collection("interesses_clientes");

  const doc = await collection.findOne({ id_cliente: idCliente });

  if (!doc) return null;

  return {
    id_cliente: doc.id_cliente,
    nome: doc.nome,
    interesses: doc.interesses
  };
}

async function getAllClientsInterests() {
  const db = await connectMongo();
  const collection = db.collection("interesses_clientes");

  const docs = await collection.find({}).toArray();

  return docs.map(doc => ({
    id_cliente: doc.id_cliente,
    nome: doc.nome,
    interesses: doc.interesses
  }));
}

module.exports = {
  getInterestsByClientId,
  getAllClientsInterests
};
