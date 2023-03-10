const express = require("express"),
      config = require("./config.json"),
      router = require("./routes/routes"),
      mongoose = require("mongoose"),
      cors = require("cors"),
      cookieParser = require("cookie-parser")
      
      
const app = express();
const port = config.port;


app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("", router);


const start = async function() {
    try {
        await mongoose.connect(config.url);
        app.listen(port, () => console.log(`Server started on port ${port}.`));
    } catch (error) {
        console.log(error);
    }
};


start();