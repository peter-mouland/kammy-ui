const getPlayersQuery = `
query { 
  getPlayers{ 
    _id code pos name club skySportsPosition isHidden new value
     fixtures { 
      aScore aTname date event hScore hTname status stats
    }
    season {
      apps asts con cs gls pensv points rcard sb subs tb ycard
    }
    gameWeek {
      apps asts con cs gls pensv points rcard sb subs tb ycard
    }
 }
} 
`;

const getPlayerQuery = `
query ($code: Int) { 
  getPlayers(code: $code){
    _id code pos name club skySportsPosition isHidden new value
    fixtures { 
      aScore aTname date event hScore hTname status stats
    }
    season {
      apps asts con cs gls pensv points rcard sb subs tb ycard
    }
    gameWeek {
      apps asts con cs gls pensv points rcard sb subs tb ycard
    }
 }
} 
`;

const mergePlayersMutation = `
  mutation { 
    mergePlayers{
      _id code pos name club isHidden new skySportsPosition value
    }   
  }
`;

module.exports = {
  getPlayersQuery,
  getPlayerQuery,
  mergePlayersMutation,
};
