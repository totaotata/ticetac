var mongoose = require("mongoose");

var HistorySchema = mongoose.Schema({
  journeys: [
    {
      departure: String,
      arrival: String,
      date: Date,
      departureTime: String,
      price: Number,
    },
  ],
  users: String,
});

var HistoryModel = mongoose.model("history", HistorySchema);

module.exports = HistoryModel;
