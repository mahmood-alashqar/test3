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
module.exports = {
  postTheData,
  getTheFavMovies
}