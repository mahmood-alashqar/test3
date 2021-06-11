const superagent = require('superagent');
const Movie = require('../models/allData.model');
async function getAllData(req, res) {
  const superAgentAPI = `https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=${process.env.API_KEY} `;
  let finalData = [];
  superagent.get(superAgentAPI).then(data => {
    finalData = data.body.results.map(mapingData => {
      return new Movie(mapingData);
    })
    res.send(finalData);
  })

}
module.exports = getAllData;