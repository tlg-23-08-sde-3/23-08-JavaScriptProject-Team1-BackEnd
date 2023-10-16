require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const { connect } = require("./utils/db");

app.use(express.json()); //Middleware from express on all requests
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(process.env.PORT || 3000, () => {
    console.log("server listening");
    connect();
});
