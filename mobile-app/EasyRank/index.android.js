/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import _ from 'lodash';
import {Component} from 'react';
import {AppRegistry, View, StyleSheet, Text, TextInput, Picker, Button} from 'react-native';
import {StackNavigator} from 'react-navigation';
import axios from 'axios';

const server = axios.create({
  baseURL: 'http://192.168.1.167:8000'
});

class Home extends Component {
  static navigationOptions = {
    title: 'The last matches'
  };

  constructor(props) {
    super(props);
    this.state = {players: []}
  }

  componentDidMount() {
    server
      .get('/api/players').then((response) => {
        this.setState({players: response.data});
      })
      .catch((err) =>{
        console.log(err);
      })
  }

  componentWillUpdate() {
    server
      .get('/api/players').then((response) => {
        this.setState({players: response.data});
      })
      .catch((err) =>{
        console.log(err);
      })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text style={styles.welcome}>
          Hello there !
          Here are the players : { _.map(this.state.players, (player) => player.name + ': ' + player.rank + '\n') }
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

class CreateMatch extends Component {
  static navigationOptions = {
    title: 'Create a match'
  };
  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount() {
    server
      .get('/api/players').then((response) => {
      this.setState({players: response.data});
    })
      .catch((err) =>{
        console.log(err);
      })
  }

  handleSubmit = () => {
    const {winner, loser} =  this.state;
    server.post('/api/matches', {winner, loser}).then(this.props.navigation.navigate('Home'));
  };

  render() {
    const pickerPlayerItems = _.map(this.state.players, (player) => <Picker.Item key={ player.id } label={ player.name } value={ player._id } />);
    return (
      <View>
        <Text>Pick the winner and his score</Text>
        <Picker
          selectedValue={_.get(this.state, 'winner.player')}
          onValueChange={(itemValue, itemIndex) => this.setState({...this.state, winner: { ...this.state.winner, player: itemValue}})}>
          <Picker.Item key={ 0 } label="" value={undefined}/>
          { pickerPlayerItems }
        </Picker>
        <TextInput
          placeholder='Score of the winner'
          onChangeText={(score) => this.setState({winner: {...this.state.winner, score: parseInt(score)}})}
          keyboardType='numeric'
          value={this.state.text }
        />
        <Text>Pick the loser and his score</Text>
        <Picker
          selectedValue={_.get(this.state, 'loser.player')}
          onValueChange={(itemValue, itemIndex) => this.setState({...this.state, loser: { ...this.state.loser, player: itemValue}})}>
          <Picker.Item key={ 0 } label="" value={undefined}/>
          { pickerPlayerItems }
        </Picker>
        <TextInput
          placeholder='Score of the loser'
          onChangeText={(score) => this.setState({loser: {...this.state.loser, score: parseInt(score)}})}
          keyboardType='numeric'
          value={this.state.text }
        />
        <Button title="Submit" onPress={ this.handleSubmit }/>
      </View>
    )
  }
}

const EasyRank = StackNavigator({
  Home: { screen: Home },
  MatchForm: { screen: CreateMatch }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('EasyRank', () => EasyRank);

export default EasyRank;