const mongoose = require('mongoose');

const fixtureSchema = {
  aScore: Number, // 2
  aTname: String, // Tottenham Hotspur
  date: String, // 2017-08-13 13:30:00
  event: Number, // 3
  hScore: Number, // 0
  hTname: String, // Newcastle United
  status: String, // PLAYED
  stats: [Number], // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

const mongooseSchema = {
  dateCreated: { type: Date, default: Date.now },
  name: {
    type: String,
    index: { unique: true },
  },
  code: Number,
  pos: String,
  club: String,
  skySportsPosition: String,
  skySportsClub: String,
  isHidden: {
    type: Boolean,
    default: false,
  },
  new: {
    type: Boolean,
    default: false,
  },
  value: Number,
  fixtures: [new mongoose.Schema(fixtureSchema)],
};


module.exports = mongoose.model('Player', new mongoose.Schema(mongooseSchema));
module.exports.mongooseSchema = mongooseSchema;
