const mongoose = require('mongoose');

const Player = mongoose.model('Player');

const getPlayers = (playerDetails = {}) => Player.aggregate({ $match: playerDetails }).exec();

module.exports = getPlayers;
