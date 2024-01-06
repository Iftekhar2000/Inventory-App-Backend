const express = require('express');
const router = require('./src/routes/api');
const app = new express();

// Security Middleware Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Mongoose Import
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);


// Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Built-in body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// Request Rate Limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

// Mongo DB Database Connection

const URI = "mongodb+srv://<your_username>:<your_password>@cluster0.eqovat9.mongodb.net/";
const OPTION = { user: 'iftekharulhaque2000', pass: 'test7', autoIndex: true };
mongoose.connect(URI, OPTION, (error) => {
  console.log("Connection Success");
  console.log(error+" > No errors");
});

// Routing Implementation
app.use("/api/v1", router);

// Undefined Route Implementation
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not Found" });
});

module.exports = app;
