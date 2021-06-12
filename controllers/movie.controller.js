const ModelTheMovie = require('../models/schema.model');

async function postTheData(req, res) {
  const { title, slug, headline, summery, article, img, suggested_link_text } = req.body;
  ModelTheMovie.find({ slug: slug }, (error, data) => {
    if (error) {
      res.send(error);
    }
    else {
      const newMovie = new ModelTheMovie({
        title: title,
        slug: slug,
        headline: headline,
        summery: summery,
        article: article,
        img: img,
        suggested_link_text: suggested_link_text
      })
      newMovie.save();
      res.send('your Movie Adedd!!');
    }
  })
}

async function getTheFavMovies(req, res) {
  ModelTheMovie.find({}, (error, data) => {
    res.send(data);
  })
}

async function deleteItem(req, res) {
  ModelTheMovie.remove({ slug: req.params.slug }, (error, data) => {
    if (error) {
      res.send(error);
    }
    else {
      ModelTheMovie.find({}, (error, data) => {
        res.send(data);
      })
    }
  })
}
async function updateItem(req, res) {
  const { title, headline } = req.body;
  const slug = req.params.slug;
  ModelTheMovie.find({ slug: slug }, (error, data) => {
    if (error) {
      res.send(error);
    }
    else {
      data[0].title = title;
      data[0].headline = headline;
      data[0].save().then(() => ModelTheMovie.find({}, (error, data) => { res.send(data); }))
    }
  })
}
module.exports = {
  postTheData,
  getTheFavMovies,
  deleteItem,
  updateItem
}