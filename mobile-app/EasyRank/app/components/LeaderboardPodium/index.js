import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {playerNameToAvatarImageSource} from "../../models/players";
import {round} from 'lodash';

export default class LeaderboardPodium extends Component {
  render() {
    const player = this.props.player;
    let number = 1;
    let style = 'round-image-first';
    if(this.props.second) {
      number = 2;
      style = 'round-image-second';
    } else if (this.props.third) {
      number = 3;
      style = 'round-image-third';
    }

    return (
      <View style={ styles.container }>
        <View style={ styles.container }>
          <Image source={ playerNameToAvatarImageSource(player.name) } style={styles[style]}/>
          <View style={styles['round-place']}>
            <Text style={ styles.white }>{number}</Text>
          </View>
        </View>
        <View>
          <Text style={ styles.white }>{ player.name }</Text>
          <Text style={ styles.white }>{ round(player.rank) }</Text>
        </View>
      </View>
    )
  }
}

LeaderboardPodium.propTypes = {
  player: React.PropTypes.object.isRequired,
  first: React.PropTypes.bool,
  second: React.PropTypes.bool,
  third: React.PropTypes.bool
};

const styles = StyleSheet.create({
  'round-image-first': {
    height: 90,
    width: 90,
    borderRadius: 50,
    borderColor: '#FFF'
  },
  'round-image-second': {
    height: 70,
    width: 70,
    borderRadius: 50,
    borderColor: '#FFF'
  },
  'round-image-third': {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderColor: '#FFF'
  },
  'round-place': {
    height: 15,
    width: 15,
    borderRadius: 50,
    backgroundColor: '#5794D5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: -16
  },
  'white': {
    color: '#FFF',
    textAlign: 'center'
  },
  'container': {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8
  }
});