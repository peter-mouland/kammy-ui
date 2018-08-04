const getPlayersQuery = `
query { 
  getPlayers{ 
    _id code pos name club skySportsClub skySportsPosition isHidden new value
     fixtures { 
      aScore aTname date event hScore hTname status stats
    }
    stats {
      week month season
    }
 }
} 
`;

const getPlayerQuery = `
query ($code: Int) { 
  getPlayers(code: $code){
    _id code pos name club skySportsClub skySportsPosition isHidden new value
    fixtures { 
      aScore aTname date event hScore hTname status stats
    }
    stats {
      week month season
    }
 }
} 
`;

const upsertPlayersMutation = `
  mutation ($playerUpdates: [PlayerUpdates]) { 
    upsertPlayers(playerUpdates: $playerUpdates){
      _id code pos name club isHidden new skySportsClub skySportsPosition value
      fixtures { 
        aScore aTname date event hScore hTname status stats
      }
      stats {
        week month season
      }
    }   
  }
`;

const mergePlayersMutation = `
  mutation { 
    mergePlayers{
      _id code pos name club isHidden new skySportsClub skySportsPosition value
       fixtures { 
         aScore aTname date event hScore hTname status stats
      }
      stats {
        week month season
      }
    }   
  }
`;

module.exports = {
  getPlayersQuery,
  getPlayerQuery,
  upsertPlayersMutation,
  mergePlayersMutation,
};
