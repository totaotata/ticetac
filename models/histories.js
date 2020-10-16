var mongoose = require("mongoose");

var HistorySchema = mongoose.Schema({
  journeys: [{ type: mongoose.Schema.Types.ObjectId, ref: "journey" }],
  users: String,
});

var HistoryModel = mongoose.model("history", HistorySchema);

module.exports = HistoryModel;
