import React, {Component} from 'react';
import _ from 'lodash';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Match from '../../components/Match';

export default class Feed extends Component {
  static navigationOptions = {
    tabBarLabel: 'Feed'
  };

  render() {
    const matches = this.props.screenProps.matches;
    const sortedMatches = _.orderBy(matches, 'createdAt', 'desc');

    return (
      <View style={ styles.container }>
        <View style={ styles.titleBar }>
          <Text style={ styles.title }>Feed</Text>
        </View>
        <FlatList
          data={sortedMatches}
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