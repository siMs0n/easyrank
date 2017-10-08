import React, {Component} from 'react';
import _ from 'lodash';
import {StyleSheet, Button, Picker, Text, TextInput, View, Modal, Image} from 'react-native';

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
        score: 11
      }
    };
  }

  togglePickPlayerModal = () => {
    this.setState({...this.state, modalVisible: !this.state.modalVisible})
  };

  handleSubmit = () => {
    const {winner, loser} =  this.state;
    this.props.screenProps.postMatch(winner, loser);
    this.props.navigation.goBack();
  };

  render() {
    const players = this.props.screenProps.players;

    const maxScore = _.get(this.state, 'winner.score') - 1;
    const winnerPickerItems = _.map(_.range(11, 20), (number) => <Picker.Item key={ number } label={ number + "" } value={ number } />);
    const loserPickerItems = _.map(_.range(0, maxScore), (number) => <Picker.Item key={ number } label={ number + "" } value={ number } />);

    return (
      <View style={ styles.container }>
        <View style={styles.participantsContainer}>
          <View style={styles.playerContainer}>
            <Image source={require('../../assets/images/man.png')} style={styles.playerImage}/>
            <Text style={styles.playerName}>{ _.get(this.state, 'winner.name', 'Select a player') }</Text>
          </View>
          <View style={styles.playerContainer}>
            <Image source={require('../../assets/images/man.png')} style={styles.playerImage}/>
            <Text style={styles.playerName}>{ _.get(this.state, 'loser.name', 'Select a player') }</Text>
          </View>
        </View>
        <Text style={styles.vsText}>VS</Text>
        <View style={styles.scoreContainer}>
          <Picker
            selectedValue={_.get(this.state, 'winner.score')}
            onValueChange={(itemValue, itemIndex) => this.setState({...this.state, winner: { ...this.state.winner, score: itemValue}})}
            style={{width: 100}}
          >
            { winnerPickerItems }
          </Picker>
          <Picker
            selectedValue={_.get(this.state, 'loser.score')}
            onValueChange={(itemValue, itemIndex) => this.setState({...this.state, loser: { ...this.state.loser, score: itemValue}})}
            style={{width: 100}}
          >
            { loserPickerItems }
          </Picker>
        </View>
        <Button title="Submit" onPress={ this.handleSubmit }/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  participantsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  playerContainer: {
    marginTop: 32,
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
  vsText: {
    fontSize: 30,
    textAlign: 'center'
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 64
  },
  scoreText: {
    fontSize: 30,
    textAlign: 'center'
  }
});