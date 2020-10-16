var mongoose = require("mongoose");

var HistorySchema = mongoose.Schema({
  journeys: [{ type: mongoose.Schema.Types.ObjectId, ref: "journey" }],
  users: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

var HistoryModel = mongoose.model("history", HistorySchema);

module.exports = HistoryModel;
