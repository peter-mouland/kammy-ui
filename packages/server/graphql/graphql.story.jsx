import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { fetchGraphQL } from '@kammy-ui/fetchr';

class GetGraphQL extends React.Component {
  state = {
    jsonData: {},
    error: null,
  };

  fetch = async ({ query, code }) => {
    const { data } = await fetchGraphQL(query, { code });
    this.setState({ jsonData: data });
  };

  render() {
    const { jsonData } = this.state;
    return (
      <div>
        <button onClick={() => this.fetch(this.props)}>Fetch via GraphQL</button>
        <pre>
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      </div>
    );
  }
}

/**
 * STORIES
 */
storiesOf('Data Sources/GraphQL', module)
  .add('Players', () => (
    <GetGraphQL query={text('query', `
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
    `)}/>
  ))
  .add('Player', () => (
    <GetGraphQL query={text('query', `
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
    `)} code={text('code', '1001')} />
  ))
  .add('Fixtures', () => (
    <GetGraphQL query={text('query', 'getFixturesQuery')}/>
  ));
