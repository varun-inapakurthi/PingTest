const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;
const cors = require('cors');
const path = require('path')
require('dotenv').config()
const { connectDb } = require('./config/db');
const userRouter = require('./routes/User');
const urlRouter = require('./routes/Url');
const { notFound, errorHandler } = require('./middlerware/errorMiddleware')
connectDb()
console.log(path.join(__dirname, 'client', 'build'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/api/user', userRouter)
app.use('/api/url', urlRouter)

__dirname = path.resolve()

if (process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => {
        res.send("Api running")
    })
}




app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started at ${PORT}`))