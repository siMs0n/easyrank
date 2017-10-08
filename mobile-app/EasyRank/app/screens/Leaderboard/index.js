import React, {Component} from 'react';
import {orderBy, take, slice} from 'lodash';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import LeaderboardPodium from '../../components/LeaderboardPodium';
import LinearGradient from 'react-native-linear-gradient';
import LeaderboardItem from '../../components/LeaderboardItem/index';
const podiumImg = require('../../assets/images/podium.png');

export default class Leaderboard extends Component {
  static navigationOptions = {
    tabBarLabel: 'Leaderboard',
    tabBarIcon: () => <Image source={ podiumImg } style={ styles.tabIcon } />
  };

  render() {
    const players = orderBy(this.props.screenProps.players, 'rank', 'desc');
    const podiumPlayers = take(players, 3);

    return (
      <View>
        <LinearGradient colors={['#5794D5', '#596FB2', '#537CC3']} style={styles.titleBar}>
          <Text style={styles.welcome}>
            Leaderboard
          </Text>
          <View style={styles.podium}>
            { podiumPlayers[1] ? <LeaderboardPodium second player={ podiumPlayers[1] } /> : null }
            { podiumPlayers[0] ? <LeaderboardPodium first player={ podiumPlayers[0] } /> : null }
            { podiumPlayers[2] ? <LeaderboardPodium third player={ podiumPlayers[2] } /> : null }
          </View>
        </LinearGradient>
        <FlatList
          data={ slice(players, 3) }
          renderItem={({item, index}) => <LeaderboardItem key={item._id} player={ item } place={ index + 4 } />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleBar: {
    paddingVertical: 10,
    elevation: 1,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 16
  },
  welcome: {
    color: '#FFFFFF',
    fontSize: 30,
    margin: 10,
    backgroundColor: 'transparent',
  },
  tabIcon: {
    width: 24,
    height: 24
  },
  podium: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});