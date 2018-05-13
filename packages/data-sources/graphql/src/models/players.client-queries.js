const getPlayersQuery = `
query { 
  getPlayers{ 
    _id code pos name club skySportsClub skySportsPosition isHidden new
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
    _id code pos name club skySportsClub skySportsPosition isHidden new
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
      _id code pos name club isHidden new skySportsClub skySportsPosition
      fixtures { 
        aScore aTname date event hScore hTname status stats
      }
      stats {
        week month season
      }
    }   
  }
`;

const initPlayersMutation = `
  mutation { 
    initPlayers{
      _id code pos name club isHidden new skySportsClub skySportsPosition
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
  initPlayersMutation,
};
