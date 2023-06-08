const express = require("express");
const config = require("config");
const mongooese = require("mongoose");
const mainRouter = require("./routes/index.routes");

const PORT = config.get("port") || 3030;

const app = express();

app.use(express.json());

app.use(mainRouter);

async function start() {
  try {
    await mongooese.connect(config.get("dbURI"));

    app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishga tushdi!`);
    });
  } catch (error) {
    console.log("Serverda xatolik");
  }
}

start();
