import mongoose from 'mongoose';

const Player = mongoose.model('Player');

const getPlayers = (playerDetails = {}) => Player.aggregate({ $match: playerDetails }).exec();

export default getPlayers;
