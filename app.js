const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')
const app = express()
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')
const userRoutes = require('./routes/userRoutes')
const { checkUser } = require('./middleware/authMiddleware')
require('dotenv').config()

// setup-middlewares
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

// routes-middleware
app.get('*', checkUser)
app.use(userRoutes)
app.use(postRoutes)
app.use(commentRoutes)

const port = 8000

// database connection
const dbURI = process.env.DB_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log('mongoose connected')
    app.listen(port, () => {
      console.log(`Listening at port ${port}`);
    })
  }
  )
  .catch((err) => console.log(err));

