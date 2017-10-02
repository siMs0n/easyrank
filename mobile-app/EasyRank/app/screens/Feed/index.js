import React, {Component} from 'react';
import _ from 'lodash';
import {StyleSheet, Text, View, Image} from 'react-native';
import {getMatches} from "../../backendService";

export default class Feed extends Component {
  static navigationOptions = {
    tabBarLabel: 'Feed'
  };

  constructor(props) {
    super(props);
    this.state = {matches: []}
  }

  componentDidMount() {
    getMatches().then((matches) => {
      this.setState({matches});
    })
      .catch((err) =>{
        console.log(err);
      })
  }

  componentWillUpdate() {
    getMatches().then((matches) => {
      this.setState({matches});
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
          Here are the matches : { _.map(this.state.matches, (match) => match.winner.player.name + ' won against ' + match.loser.player.name + '\n') }
        </Text>
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