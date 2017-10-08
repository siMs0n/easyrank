import React, {Component} from 'react';
import {map} from 'lodash';
import {StyleSheet, Text, ScrollView, View, Modal, Image, TouchableOpacity} from 'react-native';
import {playerNameToAvatarImageSource} from "../../models/players";

export default class PickPlayerModal extends Component {

  pick = (player) => {
    this.props.onPick(player);
  };

  render() {
    const playerItems = map(this.props.players, (player) => {
      return (
        <TouchableOpacity key={ player._id } onPress={ () => this.pick(player) }>
          <View style={styles.playerContainer}>
            <Image source={ playerNameToAvatarImageSource(player.name) } style={styles.playerImage}/>
            <Text style={styles.playerName}>{ player.name }</Text>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={ this.props.onClose }
      >
        <View style={ styles.container }>
          <ScrollView>
            <View style={ styles.scrollViewContent }>
              <Text style={ styles.titleText }>Select a player</Text>
              <View style={ styles.playerItemsContainer }>
                {playerItems}
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollViewContent: {
    backgroundColor: 'white',
    paddingVertical: 16
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16
  },
  playerItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  playerContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    alignItems: 'center'
  },
  playerImage: {
    height: 64,
    width: 64
  },
  playerName: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8
  }
});
