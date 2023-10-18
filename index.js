require("dotenv").config();

const express = require("express");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const { connect } = require("./utils/db");

const candidatesRouter = require("./routes/candidates");
const companyRouter = require("./routes/companies");
const jobRouter = require("./routes/jobs");
const resumeRouter = require("./routes/resumes");

app.use(express.json()); //Middleware from express on all requests
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(cookieParser());

app.use("/candidate", candidatesRouter);
app.use("/company", companyRouter);
app.use("/job", jobRouter);
app.use("/resume", resumeRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server listening - port: ${port}`);
    connect();
});
