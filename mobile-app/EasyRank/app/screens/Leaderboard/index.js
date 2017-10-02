import React, {Component} from 'react';
import _ from 'lodash';
import {Button, StyleSheet, Text, View} from 'react-native';
import {getPlayers} from "../../backendService";

export default class Leaderboard extends Component {
  static navigationOptions = {
    tabBarLabel: 'Leaderboard'
  };

  constructor(props) {
    super(props);
    this.state = {players: []}
  }

  componentDidMount() {
    getPlayers().then((players) => {
      this.setState({players});
    })
      .catch((err) =>{
        console.log(err);
      })
  }

  componentWillUpdate() {
    getPlayers().then((players) => {
      this.setState({players});
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

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});