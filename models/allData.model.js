class Movie {
  constructor(data) {
    this.title = data.display_title;
    this.headline = data.headline;
    this.summery = data.summary_short;
    this.article = data.link.url;
    this.img = data.multimedia.src;
    this.suggested_link_text = data.link.suggested_link_text;
    this.slug = data.display_title.toLowerCase().split(' ').join('-');

  }
}
module.exports = Movie;