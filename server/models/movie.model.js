const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const MovieSchema = new mongoose.Schema({
  FIELD1: {
    type: Number,
  },
  tconst: {
    type: String,
  },
  titleType: {
    type: String,
  },
  primaryTitle: {
    type: String,
  },
  originalTitle: {
    type: String,
  },
  "Roy Mood": {
    type: String,
  },
  startYear: {
    type: String,
  },
  endYear: {
    type: String,
  },
  runtimeMinutes: {
    type: String,
  },
  genres_x: {
    type: String,
  },
  nconst: {
    type: String,
  },
  director: {
    type: String,
  },
  averageRating: {
    type: Number,
  },
  numVotes: {
    type: Number,
  },
  rotten_tomatoes_link: {
    type: String,
  },
  movie_info: {
    type: String,
  },
  critics_consensus: {
    type: String,
  },
  content_rating: {
    type: String,
  },
  genres_y: {
    type: String,
  },
  directors: {
    type: String,
  },
  authors: {
    type: String,
  },
  actors: {
    type: String,
  },
  original_release_date: {
    type: String,
  },
  streaming_release_date: {
    type: String,
  },
  runtime_x: {
    type: Number,
  },
  production_company: {
    type: String,
  },
  tomatometer_status: {
    type: String,
  },
  tomatometer_rating: {
    type: Number,
  },
  tomatometer_count: {
    type: Number,
  },
  audience_status: {
    type: String,
  },
  audience_rating: {
    type: Number,
  },
  audience_count: {
    type: Number,
  },
  tomatometer_top_critics_count: {
    type: Number,
  },
  tomatometer_fresh_critics_count: {
    type: Number,
  },
  tomatometer_rotten_critics_count: {
    type: Number,
  },
  genres: {
    type: String,
  },
  belongs_to_collection: {
    type: Object,
  },
  budget: {
    type: Number,
  },
  overview: {
    type: String,
  },
  popularity: {
    type: Number,
  },
  release_date: {
    type: String,
  },
  revenue: {
    type: Number,
  },
  vote_average: {
    type: Number,
  },
  vote_count: {
    type: Number,
  },
  imageurl: {
    type: String,
  },
  runtime: {
    type: String,
  },
  imdbrating: {
    type: String,
  },
  released: {
    type: Number,
  },
  type: {
    type: String,
  },
  synopsis: {
    type: String,
  },
  language: {
    type: String,
  },
  "streamingAvailability.country.US": {
    type: String,
  },
  EMOJI: {
    type: String,
  },
  POSTER: {
    type: String,
  },
  LINK: {
    type: String,
  },
  "Amazon affiliate link": {
    type: String,
  },
  created_date: {
    type: Number,
    default: Date.now,
  },
  updated_date: {
    type: Number,
    default: Date.now,
  },
});

MovieSchema.plugin(mongoosePaginate);
const MovieCollection = new mongoose.model("movie", MovieSchema);

module.exports = MovieCollection;
