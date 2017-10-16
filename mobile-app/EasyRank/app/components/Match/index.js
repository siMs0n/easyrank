import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import moment from 'moment';
import {playerNameToAvatarImageSource} from "../../models/players";

export default class Match extends Component {
  render() {
    const { match } = this.props;
    const now = moment();
    const createdAtMoment = moment(match.createdAt);
    let formattedTime = "";
    if (now.isSame(createdAtMoment, 'day')) {
      formattedTime = createdAtMoment.format('HH:mm');
    } else if (now.subtract(1, 'days').isSame(createdAtMoment, 'day')) {
      formattedTime = 'Yesterday at ' + createdAtMoment.format('HH:mm');
    } else if (now.isSame(createdAtMoment, 'week')) {
      formattedTime = createdAtMoment.format('dddd');
    } else {
      formattedTime = createdAtMoment.format('MMM Do YYYY')
    }

    return (
      <View style={styles.container}>
        <Text style={styles.time}>{formattedTime}</Text>
        <View style={styles.resultContainer}>
          <View style={styles.playerContainer}>
            <Image source={playerNameToAvatarImageSource(match.winner.player.name)} style={styles.playerImage}/>
            <Text style={styles.playerName}>{match.winner.player.name}</Text>
          </View>
          <Text style={styles.score}>{match.winner.score}</Text>
          <View style={styles.pingPongImageContainer}>
            <Image source={require('../../assets/images/ping-pong.png')} style={styles.pingPongImage}/>
          </View>
          <Text style={styles.score}>{match.loser.score}</Text>
          <View style={styles.playerContainer}>
            <Image source={playerNameToAvatarImageSource(match.loser.player.name)} style={styles.playerImage}/>
            <Text style={styles.playerName}>{match.loser.player.name}</Text>
          </View>
        </View>
        <View style={styles.divider}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
    backgroundColor: '#999'
  },
  resultContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 8,
    marginBottom: 16
  },
  playerContainer: {
    marginTop: 32
  },
  playerImage: {
    height: 48,
    width: 48
  },
  playerName: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    color: 'rgba(0,0,0,0.87)'
  },
  pingPongImageContainer: {
    alignItems: 'center'
  },
  pingPongImage: {
    height: 40,
    width: 40,
    marginVertical: 4
  },
  scoreContainer: {
    alignSelf: 'stretch',
  },
  score: {
    fontSize: 35,
    textAlign: 'center',
    margin: 10,
    width: 45,
    color: 'rgba(0,0,0,0.87)'
  },
  time: {
    position: 'absolute',
    top: 8,
    left: 16
  }
});
