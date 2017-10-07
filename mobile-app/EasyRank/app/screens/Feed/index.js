import React, {Component} from 'react';
import _ from 'lodash';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import Match from '../../components/Match';
import CreateMatchModal from '../../components/CreateMatchModal';
import ActionButton from 'react-native-action-button';

export default class Feed extends Component {
  static navigationOptions = {
    tabBarLabel: 'Feed',
    tabBarIcon: () => <Image source={require('../../assets/images/menu.png')} style={ styles.tabIcon } />
  };

  constructor(props){
    super(props);
    this.state = {modalVisible: false}
  }

  toggleCreateMatchModal = () => {
    this.setState({modalVisible: !this.state.modalVisible})
  };

  render() {
    const {matches, players, postMatch} = this.props.screenProps;
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
        <ActionButton buttonColor="#00E676" onPress={this.toggleCreateMatchModal}>
          <Text style={ styles.plus }>+</Text>
        </ActionButton>
        <CreateMatchModal visible={this.state.modalVisible} players={players} postMatch={postMatch} onClose={this.toggleCreateMatchModal}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleBar: {
    backgroundColor: '#03A9F4',
    paddingVertical: 10,
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
