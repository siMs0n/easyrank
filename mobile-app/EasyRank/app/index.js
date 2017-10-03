import React from 'react';
import {TabNavigator} from 'react-navigation';
import Feed from './screens/Feed';
import Leaderboard from './screens/Leaderboard';
import CreateMatch from './screens/CreateMatch';
import { NavigationComponent } from 'react-native-material-bottom-navigation'

const EasyRank = TabNavigator({
  Feed: { screen: Feed },
  MatchForm: { screen: CreateMatch },
  Leaderboard: { screen: Leaderboard }
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: 'white',
      rippleColor: 'white',
      tabs: {
        Feed: {
          barBackgroundColor: '#00796B'
        },
        MatchForm: {
          barBackgroundColor: '#00796B'
        },
        Leaderboard: {
          barBackgroundColor: '#00796B'
        }
      }
    }
  }
});

export default EasyRank;