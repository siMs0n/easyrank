import React, {Component} from 'react';
import _ from 'lodash';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {getMatches} from "../../backendService";
import Match from '../../components/Match';

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
      const sortedMatches = _.orderBy(matches, 'createdAt', 'desc');
      this.setState({matches: sortedMatches});
    })
      .catch((err) =>{
        console.log(err);
      })
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.titleBar }>
          <Text style={ styles.title }>Feed</Text>
        </View>
        <FlatList
          data={this.state.matches}
          renderItem={({item}) => <Match key={item._id} match={item} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleBar: {
    backgroundColor: '#00796B',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#666',
    elevation: 1
  },
  title: {
    fontSize: 30,
    marginLeft: 32,
    color: 'white'
  },
  container: {
    backgroundColor: 'white',
    flex: 1
  }
});