const path = require("path")
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
app.use('/comments',require('./routes/commentRoute.js'))


// server frontend

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    )
  } else {
    app.get('/', (req, res) => res.send('Please set to production'))
}


app.use(errorHandler)
app.listen(port,() => console.log(`server started on port ${port}.`))