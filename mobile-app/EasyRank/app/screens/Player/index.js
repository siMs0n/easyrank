import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Match from '../../components/Match';
import {playerNameToAvatarImageSource} from "../../models/players";
import {filter, findIndex, round, orderBy} from 'lodash';
import {hasPlayedAMatch} from "../Leaderboard";

export default class Player extends Component {
  static navigationOptions = {
    tabBarVisible: false,
    header: null
  };
  render() {
    const {matches, players} = this.props.screenProps;
    const player = this.props.navigation.state.params.player;
    const matchesWithPlayer = filter(matches, (match) => match.winner.player._id === player._id || match.loser.player._id === player._id);
    const wins = filter(matchesWithPlayer, (match) => match.winner.player._id === player._id).length;
    const loses = filter(matchesWithPlayer, (match) => match.loser.player._id === player._id).length;
    const activePlayers = filter(orderBy(players, 'rank', 'desc'), p => hasPlayedAMatch(p, matches));
    const leaderboardPosition = findIndex(activePlayers, player) + 1;
    const winningRatio = loses ? round(wins/loses, 2) : '-'

    return (
      <View style={styles.container}>
        <LinearGradient colors={['#5794D5', '#596FB2', '#537CC3']} style={styles.top}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack() }>
            <Image source={require('../../assets/images/arrow-left.png')} style={ styles.backButtonIcon } />
          </TouchableOpacity>
          <View style={styles.topMainContent}>
            <View style={styles.playerContainer}>
              <Image source={playerNameToAvatarImageSource(player.name)} style={styles.playerImage}/>
              <Text style={styles.playerName}>{player.name}</Text>
            </View>
            <View style={styles.statsContainer}>
              <Text style={styles.rankText}>Rank: {round(player.rank)} ({leaderboardPosition})</Text>
              <Text style={styles.statText}>Matches played: {matchesWithPlayer.length}</Text>
              <Text style={styles.statText}>Won: {wins}</Text>
              <Text style={styles.statText}>Lost: {loses}</Text>
              <Text style={styles.statText}>Winning ratio: {winningRatio}</Text>
            </View>
          </View>
        </LinearGradient>
        <ScrollView style={ styles.scrollView }>
          <Text style={styles.matchesText}>Matches</Text>
          <FlatList
            data={matchesWithPlayer}
            renderItem={({item}) => <Match key={item._id} match={item} />}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  backButtonIcon: {
    width: 24,
    height: 24,
    margin: 16
  },
  topMainContent: {
    display: 'flex',
    flexDirection: 'row'
  },
  playerContainer: {
    marginLeft: 32,
    marginBottom: 16
  },
  playerImage: {
    height: 96,
    width: 96
  },
  playerName: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 8,
    color: '#FFFFFF'
  },
  statsContainer: {
    marginLeft: 48
  },
  rankText: {
    fontSize: 20,
    color: '#FFFFFF'
  },
  statText: {
    fontSize: 16,
    color: '#FFFFFF'
  },
  scrollView: {
    marginBottom: 48
  },
  matchesText: {
    fontSize: 20,
    margin: 16
  }
});
