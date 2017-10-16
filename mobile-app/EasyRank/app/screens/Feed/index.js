import React, {Component} from 'react';
import _ from 'lodash';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Match from '../../components/Match';
import ActionButton from 'react-native-action-button';

export default class Feed extends Component {
  static navigationOptions = {
    title: 'Feed',
    headerStyle: {backgroundColor: '#03A9F4'},
    headerTitleStyle: {color: 'white', fontSize: 24}
  };

  constructor(props){
    super(props);
    this.state = {modalVisible: false}
  }

  render() {
    const matches = this.props.screenProps.matches;
    const sortedMatches = _.orderBy(matches, 'createdAt', 'desc');

    return (
      <View style={ styles.container }>
        <FlatList
          data={sortedMatches}
          renderItem={({item}) => <Match key={item._id} match={item} />}
        />
        <ActionButton buttonColor="#00E676" onPress={() => this.props.navigation.navigate('CreateMatch')} degrees={0}>
          <Text style={ styles.plus }>+</Text>
        </ActionButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00E676',
    position: 'absolute',
    bottom: 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  plus: {
    fontSize: 30,
    color: "white",
    marginBottom: 3
  },
  tabIcon: {
    width: 24,
    height: 24
  }
});
