const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: null,
  },
  login: {
    type: Object,
  },
  cardDetails: {
    type: mongoose.Types.ObjectId,
    default: null,
    ref: "user",
  },
  moviesCollection: [
    {
      type: mongoose.Types.ObjectId,
      ref: "moviescollection",
      default: [],
    },
  ],
  profile_img_url: {
    type: String,
    default: null,
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

UserSchema.plugin(mongoosePaginate);
const UserCollection = new mongoose.model("user", UserSchema);

module.exports = UserCollection;
