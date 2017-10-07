import React, {Component} from 'react';
import _ from 'lodash';
import {Button, StyleSheet, Text, View, Image} from 'react-native';

export default class Leaderboard extends Component {
  static navigationOptions = {
    tabBarLabel: 'Leaderboard',
    tabBarIcon: () => <Image source={require('../../assets/images/podium.png')} style={ styles.tabIcon } />
  };

  render() {
    const { navigate } = this.props.navigation;
    console.log(this.props.screenProps)
    const players = this.props.screenProps.players;
    return (
      <View>
        <Text style={styles.welcome}>
          Hello there !
          Here are the players : { _.map(players, (player) => player.name + ': ' + player.rank + '\n') }
        </Text>
        <Button
          title="Create a new match"
          onPress={() =>
            navigate('MatchForm')
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  tabIcon: {
    width: 24,
    height: 24
  }
});