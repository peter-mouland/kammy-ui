const getPlayersQuery = `
query { 
  getPlayers{ 
    _id code pos name club skySportsClub skySportsPos isHidden new fixtures { 
      aScore aTname date event hScore hTname status stats
    }
 }
} 
`;

const getPlayerQuery = `
query ($code: Int) { 
  getPlayers(code: $code){
    _id code pos name club skySportsClub skySportsPos isHidden new fixtures { 
      aScore aTname date event hScore hTname status stats
    }
 }
} 
`;

const upsertPlayersMutation = `
  mutation ($playerUpdates: [PlayerUpdates]) { 
    updatePlayers(playerUpdates: $playerUpdates){
      _id code pos name club isHidden new skySportsClub skySportsPos fixtures
    }   
  }
`;

module.exports = {
  getPlayersQuery,
  getPlayerQuery,
  upsertPlayersMutation,
};
