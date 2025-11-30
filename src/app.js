const {
  getFriendsByClientId,
  getAllClientsWithFriends
} = require("./database/graphService");

const express = require("express");
const app = express();
const port = 3001;

const {
  getInterestsByClientId,
  getAllClientsInterests
} = require("./database/documentService");


app.get("/mongo/interesses", async (req, res) => {
  try {
    const data = await getAllClientsInterests();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar interesses no MongoDB");
  }
});

app.get("/mongo/interesses/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await getInterestsByClientId(id);

    if (!data) return res.status(404).send("Cliente não encontrado");

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar interesses do cliente");
  }
});


app.get("/neo4j/clientes-amigos", async (req, res) => {
  try {
    const data = await getAllClientsWithFriends();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar amigos no Neo4j");
  }
});

app.get("/neo4j/amigos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await getFriendsByClientId(id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar amigos do cliente no Neo4j");
  }
});


app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
