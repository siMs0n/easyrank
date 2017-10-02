import React from 'react';
import {StackNavigator} from 'react-navigation';
import Feed from './screens/Feed';
import Leaderboard from './screens/Leaderboard';
import CreateMatch from './screens/CreateMatch';

const EasyRank = StackNavigator({
  Feed: { screen: Feed },
  Leaderboard: { screen: Leaderboard },
  MatchForm: { screen: CreateMatch }
});

export default EasyRank;