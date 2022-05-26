const mongoose = require("mongoose");

const MoviesCollectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "user",
  },
  collectionName: {
    type: String,
    required: true,
  },
  collectionDescription: {
    type: String,
  },
  mainMovie: {
    id: {
      type: mongoose.Types.ObjectId,
      ref: "movie",
    },
    assignedMood: {
      type: String,
    },
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  moods: [
    {
      type: String,
    },
  ],
  isPublic: {
    type: Boolean,
    default: true,
  },
  movies: [
    {
      id: {
        type: mongoose.Types.ObjectId,
        ref: "movie",
      },
      assignedMood: {
        type: String,
      },
      isEmoji: {
        type: Boolean,
      },
    },
  ],
  created_date: {
    type: Number,
    default: Date.now,
  },
  updated_date: {
    type: Number,
    default: Date.now,
  },
});

const MoviesCollectionCollection = new mongoose.model(
  "moviescollection",
  MoviesCollectionSchema
);

module.exports = MoviesCollectionCollection;
