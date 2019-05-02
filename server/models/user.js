const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const PickSchema = new Schema({
  name: String,
  fighterID: Number,
  eventID: Number
});

const UserSchema = new Schema({
  name: String,
  password: String,
  picks: [PickSchema]
});

//Create Model
const User = mongoose.model('user', UserSchema);

module.exports = User;
