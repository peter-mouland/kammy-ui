#!/usr/bin/env node

const { promisify } = require('util');
const fs = require('fs');

const fetchr = require('../.storybook/fetchr');

const start = new Date();
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const writeFile = promisify(fs.writeFile);
const getFixtures = (code) => (
  fetchr.getJSON(`https://fantasyfootball.skysports.com/cache/json_player_stats_${code}.json`)
);

return fetchr.getJSON('https://fantasyfootball.skysports.com/cache/json_players.json')
  .then(async (data) => {
    const promises = data.players.map(async (player, i) => {
      await delay((i * 25));
      const fixtures = await getFixtures(player.id);
      const dataWithFixtures = ({ ...player, ...fixtures });
      return writeFile(
        `./.storybook/fixtures/player-stats-${dataWithFixtures.id}.json`,
        JSON.stringify(dataWithFixtures, null, 2),
      );
    });
    const allWithFixtures = await Promise.all(promises);
    const ms = new Date() - start;

    console.log(`RESPONSE TIME: ${ms}ms`);

    return allWithFixtures;
  });
