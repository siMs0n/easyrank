import React from 'react';
import {StackNavigator} from 'react-navigation';
import Home from './components/Home';
import CreateMatch from './components/CreateMatch';

const EasyRank = StackNavigator({
  Home: { screen: Home },
  MatchForm: { screen: CreateMatch }
});

export default EasyRank;