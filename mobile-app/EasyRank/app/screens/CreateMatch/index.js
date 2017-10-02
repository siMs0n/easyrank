import React, {Component} from 'react';
import _ from 'lodash';
import {Button, Picker, Text, TextInput, View} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {getPlayers, postMatch} from "../../backendService";

export default class CreateMatch extends Component {
  static navigationOptions = {
    title: 'Create a match'
  };
  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount() {
    getPlayers().then((players) => {
      this.setState({players});
    })
      .catch((err) =>{
        console.log(err);
      })
  }

  handleSubmit = () => {
    const {winner, loser} =  this.state;
    postMatch(winner, loser).then(this.props.navigation.navigate('Home'));
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