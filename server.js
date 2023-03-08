const express = require("express"),
      config = require("./config.json"),
      router = require("./routes/routes"),
      MongoClient = require("mongodb").MongoClient,
      cors = require("cors"),
      jwt = require("jsonwebtoken")
      
      
const app = express();
const port = config.port;
const mongoClient = new MongoClient(config.url);


app.use(cors());
app.use(express.json());
app.use("", router);


const start = async function() {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("mongo");
        const collection = db.collection("users");
        app.listen(port, () => console.log(`Server started on port ${port}.`));
    } catch (error) {
        console.log(error);
    }
};


start();