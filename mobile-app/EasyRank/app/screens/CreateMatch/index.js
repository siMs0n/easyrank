import React, {Component} from 'react';
import {get, map, omit, range} from 'lodash';
import {StyleSheet, Button, Picker, Text, View, Image, TouchableOpacity} from 'react-native';
import {playerNameToAvatarImageSource} from "../../models/players";
import PickPlayerModal from '../../components/PickPlayerModal';

export default class CreateMatch extends Component {
  static navigationOptions = {
    title: 'Create match',
    tabBarVisible: false
  };

  constructor(props){
    super(props);
    this.state = {
      winner: {
        name: undefined,
        score: 11
      },
      loser: {
        name: undefined,
        score: 0
      },
      pickPlayerModalVisible: false
    };
  }

  closePickPlayerModal = () => {
    this.setState({...this.state, pickPlayerModalVisible: false})
  };
  
  showPickPlayerModal = (pickingWinner) => {
    this.setState({...this.state, pickPlayerModalVisible: true, pickingWinner: pickingWinner})
  };
  
  onPickPlayer = (player) => {
    if(this.state.pickingWinner) {
      this.setState({...this.state, winner: { ...this.state.winner, name: player.name, _id: player._id}, pickPlayerModalVisible: false})
    } else {
      this.setState({...this.state, loser: { ...this.state.loser, name: player.name, _id: player._id}, pickPlayerModalVisible: false})
    }
  };

  handleSubmit = () => {
    const {winner, loser} =  this.state;
    this.props.screenProps.postMatch({player: winner._id, score: winner.score}, {player: loser._id, score: loser.score});
    this.props.navigation.goBack();
  };

  render() {
    const players = this.props.screenProps.players;

    const loserMaxScore = get(this.state, 'winner.score') - 1;
    const winnerPickerItems = map(range(11, 21), (number) => <Picker.Item key={ number } label={ number + "" } value={ number } />);
    const loserPickerItems = map(range(0, loserMaxScore + 1), (number) => <Picker.Item key={ number } label={ number + "" } value={ number } />);

    return (
      <View style={ styles.container }>
        <View style={styles.labelsContainer}>
          <Text style={styles.labelText}>Winner</Text>
          <Text style={styles.labelText}>Loser</Text>
        </View>
        <View style={styles.participantsContainer}>
          <TouchableOpacity onPress={ () => this.showPickPlayerModal(true) }>
            <View style={styles.playerContainer}>
              <Image source={ playerNameToAvatarImageSource(get(this.state, 'winner.name')) } style={styles.playerImage}/>
              <Text style={styles.playerName}>{ get(this.state, 'winner.name', 'Select a player') }</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => this.showPickPlayerModal(false) }>
            <View style={styles.playerContainer}>
              <Image source={ playerNameToAvatarImageSource(get(this.state, 'loser.name')) } style={styles.playerImage}/>
              <Text style={styles.playerName}>{ get(this.state, 'loser.name', 'Select a player') }</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.scoreContainer}>
          <Picker
            selectedValue={get(this.state, 'winner.score')}
            onValueChange={(itemValue, itemIndex) => this.setState({...this.state, winner: { ...this.state.winner, score: itemValue}})}
            style={{width: 100}}
          >
            { winnerPickerItems }
          </Picker>
          <Picker
            selectedValue={get(this.state, 'loser.score')}
            onValueChange={(itemValue, itemIndex) => this.setState({...this.state, loser: { ...this.state.loser, score: itemValue}})}
            style={{width: 100}}
          >
            { loserPickerItems }
          </Picker>
        </View>
        <View style={ styles.buttonContainer }>
          <Button title="Submit" onPress={ this.handleSubmit } disabled={ !this.state.winner.name && !this.state.loser.name } />
        </View>
        <PickPlayerModal visible={ this.state.pickPlayerModalVisible } players={ players } onPick={ this.onPickPlayer } onClose={ this.closePickPlayerModal } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    alignItems: 'center'
  },
  labelsContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  participantsContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  playerContainer: {
    marginTop: 32,
    marginBottom: 16,
    alignItems: 'center'
  },
  playerImage: {
    height: 80,
    width: 80
  },
  playerName: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8
  },
  labelText: {
    fontSize: 30,
    textAlign: 'center'
  },
  scoreContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 64
  },
  scoreText: {
    fontSize: 30,
    textAlign: 'center'
  },
  buttonContainer: {
    width: 200
  }
});