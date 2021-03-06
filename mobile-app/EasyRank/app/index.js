import React from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import Feed from './screens/Feed';
import Leaderboard from './screens/Leaderboard';
import CreateMatch from './screens/CreateMatch';
import Player from './screens/Player';
import {Image} from 'react-native';
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import {getMatches, getPlayers, postMatch} from "./backendService";

const AppNavigation = TabNavigator({
  TabItem1: {
    screen: StackNavigator({Feed: { screen: Feed }, CreateMatch: { screen: CreateMatch}, Player: { screen: Player}}),
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: () => <Image source={require('./assets/images/menu.png')} style={ {width: 24, height: 24} } />
    }
  },
  TabItem2: {
    screen: StackNavigator({Leaderboard: { screen: Leaderboard }, Player: { screen: Player}}),
    navigationOptions: {
      tabBarLabel: 'Leaderboard',
      tabBarIcon: () => <Image source={ require('./assets/images/podium.png') }  style={ {width: 24, height: 24} } />
    }
  }
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: 'white',
      rippleColor: 'white',
      tabs: {
        TabItem1: {
          barBackgroundColor: '#03A9F4'
        },
        TabItem2: {
          barBackgroundColor: '#03A9F4'
        }
      }
    }
  }
});

export default class EasyRank extends React.Component {

  constructor(props) {
    super(props);
    this.state = {matches: [], players: []}
  }

  componentWillMount() {
    Promise.all([getMatches(), getPlayers()])
      .then(([matches, players]) => {
        this.setState({matches, players})
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createMatch(winner, loser) {
    postMatch(winner, loser).then(() => {
      Promise.all([getMatches(), getPlayers()])
        .then(([matches, players]) => {
          this.setState({matches, players})
        })
        .catch((err) => {
          console.log(err);
        });
    })
  };

  render() {
    return(
      <AppNavigation screenProps={ {matches: this.state.matches, players: this.state.players, postMatch: this.createMatch.bind(this)}} />
    );
  }
};