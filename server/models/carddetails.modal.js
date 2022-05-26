const mongoose = require("mongoose");

const CardDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: Number,
  },
  expDate: {
    type: String,
  },
  cvv: {
    type: Number,
  },
  zipcode: {
    type: Number,
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

const CardDetailsCollection = new mongoose.model(
  "carddetails",
  CardDetailsSchema
);

module.exports = CardDetailsCollection;
