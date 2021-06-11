const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8085;
const DB = process.env.DATABASE_URL;
const mongoose = require('mongoose');
const getAllData = require('./controllers/getAllData.controllers');
const MOVIE = require('./controllers/movie.controller');
mongoose.connect(`${DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});







app.get('/', (req, res) => {
  res.send('everything is ok');
})

app.get('/main', getAllData);
app.post('/main/movie', MOVIE.postTheData);
app.get('/main/movie', MOVIE.getTheFavMovies);


app.listen(PORT, () => {
  console.log(`you listening @ ${PORT}`)
});