const express = require('express')
const colors= require('colors');
const dotenv = require('dotenv').config()
const {errorHandler } = require("./middleware/errorMiddleware.js")
const connectDB = require('./config/db')
const port = process.env.PORT || 5000;


connectDB();
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended : false}))

app.use('/posts', require('./routes/postRoutes.js'))
app.use('/users', require('./routes/userRoutes.js'))

app.use(errorHandler)
app.listen(port,() => console.log(`server started on port ${port}.`))