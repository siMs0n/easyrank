import React, {Component} from 'react';
import {orderBy, take, slice, some, filter, reject} from 'lodash';
import {StyleSheet, Text, View, Image, FlatList, ScrollView} from 'react-native';
import LeaderboardPodium from '../../components/LeaderboardPodium';
import LinearGradient from 'react-native-linear-gradient';
import LeaderboardItem from '../../components/LeaderboardItem/index';

export default class Leaderboard extends Component {
  static navigationOptions = {
    title: 'Leaderboard',
    header: null
  };

  render() {
    const players = orderBy(this.props.screenProps.players, 'rank', 'desc');
    const matches = this.props.screenProps.matches;
    const activePlayers = filter(players, p => hasPlayedAMatch(p, matches));
    const passivePlayers = reject(players,  p => hasPlayedAMatch(p, matches));
    const hasPassivePlayers = passivePlayers.length > 0;
    const podiumPlayers = activePlayers.length >= 3 ? take(activePlayers, 3) : take(players, 3);

    return (
      <View style={ styles.container }>
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
        <ScrollView>
        <FlatList
          style={ styles.list }
          data={ hasPassivePlayers ? slice(activePlayers, 3) : slice(players, 3) }
          renderItem={({item, index}) => <LeaderboardItem key={item._id} player={ item } place={ index + 4 } />}
        />
        {hasPassivePlayers ? (
          <View>
            <View style={styles.divider}/>
            <Text style={ styles.subheading }>Players who haven't played yet</Text>
            <FlatList
              style={ styles.list }
              data={ passivePlayers }
              renderItem={({item, index}) => <LeaderboardItem key={item._id} player={ item } />}
            />
          </View>
        ) : null}
        </ScrollView>
      </View>
    )
  }
}

export function hasPlayedAMatch(player, matches) {
  return some(matches, (match) => {
    return match.winner.player._id === player._id || match.loser.player._id === player._id;
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleBar: {
    paddingVertical: 10,
    elevation: 1,
    display: 'flex',
    alignItems: 'center'
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
  },
  list: {
    paddingTop: 12
  },
  subheading: {
    marginTop: 8,
    marginLeft: 16
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
    backgroundColor: '#999'
  }
});