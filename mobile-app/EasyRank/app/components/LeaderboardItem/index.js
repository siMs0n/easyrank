import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {playerNameToAvatarImageSource} from "../../models/players";
import {round} from 'lodash';

export default class LeaderboardItem extends Component {
  render() {
    const { player, place } = this.props;

    return (
        <View style={styles.container}>
          <View style={styles.resultContainer}>
            <View style={ styles.row }>
              <View style={ styles.place } ><Text>{ place }</Text></View>
              <Image source={ playerNameToAvatarImageSource(player.name) } style={ styles.avatar } />
              <Text>{ player.name }</Text>
            </View>
            <Text>{ round(player.rank) }</Text>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  resultContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginBottom: 16
  },
  place: {
    width: 32
  },
  avatar: {
    height: 40,
    width: 40,
    marginRight: 24
  }
});
