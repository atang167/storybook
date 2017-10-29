import React, { Component } from 'react';
import { View, Button, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import axios from 'axios'

import * as friendActions from '../../../../actions/friendActions'

import { SearchBar } from 'react-native-elements'
import FriendsEntry from './FriendsEntry'

class Friends extends Component {
  constructor(props) {
    super(props); 
    // this.state = {
    //   friends: [{id: 1, img: "", name: "Angie"}, {id: 2, img: "", name: "Jordan"}  ], 
    //   results: [{id: 2, img: "", name: "Jeff"}, {id: 4, img: "", name: "Daniel"}],
    //   input: ''
    // }
    this.state = {
      results: [],
      input: ''
    }
  }

  componentDidMount() {
    // axios.get('api/friends/' + this.props.userId)
    // .then(({ data }) => {
    //   data.map(data => {
    //     if (data.user_id !== this.props.userId) {
    //       this.setState({ friends: this.state.friends.concat(data.user_id)})
    //     }
    //     if (data.friend_id !== this.props.userId) {
    //       this.setState({ friends: this.state.friends.concat(data.friend_id)})
    //     }
    //   })
    // })
    // .catch(err => {
    //   console.log('failed to retrieve friends', err);
    // })
    this.props.actions.getFriends(this.screenProps.userId);
  }
  
  searchUsers(firstName, lastName) {
    // axios.get('api/search/' + firstName + '/' + lastName)
    // .then(({ data }) => {
    //   this.setState({results: data})
    // })
    // .catch(err => {
    //   console.log('failed to search friends', err);
    // })
  }

  sendRequest(friendId) {
    axios.post('api/friend/request', {
      friendId: friendId,
      userId: this.screenProps.userId,
      type: 'pending'
    })
    .then(({ data }) => {
      console.log('Success sending request', data);
    })
    .catch(err => {
      console.log('Request failed', err);
    })
  }

  clearSearch() {
    this.setState({results: []});
  }

  render() {
    const {navigate} = this.props.navigation; 
    if (this.state.results.length) {
      return (
        <View>
          <SearchBar
            placeholder="Search"
            onChangeText={(text) => {this.setState({input: text})}}
            onSubmitEditing={() => {
              this.searchFriends(this.state.input.split(' ')[0], this.state.input.split(' ')[1]);
            }}
            //add icon to clear searches
          /> 
          <Button
            onPress={() => navigate('Messages')}
            title="Go to messages"
          /> 
          <Button
            onPress={() => navigate('FriendRequests')}
            title="Go to friend requests"
          /> 
          <Button
            onPress={() => navigate('Profile')}
            title="Go back to profile"
          /> 
          {this.state.results.map(result => {
            return ( 
              <TouchableWithoutFeedback>
                <FriendsEntry 
                  sendRequest={this.sendRequest.bind(this)} 
                  friends={this.props.friends} 
                  id={result.id} 
                  img={result.profile_img_url} 
                  name={result.name}
                /> 
              </TouchableWithoutFeedback>
            )
          })}
      </View> 
      )
    } else {
      return (
        <View>
          <SearchBar 
            placeholder="Search"
            searchFriends={this.searchFriends.bind(this)} 
            onChangeText={(text) => {this.setState({input: text})}}
            onSubmitEditing={() => {
              this.searchFriends(this.state.input.split(' ')[0], this.state.input.split(' ')[1]);
              clear();
            }}
            //add icon to clear searches
          />
          <Button
            onPress={() => navigate('Messages')}
            title="Go to messages"
          /> 
          <Button
            onPress={() => navigate('FriendRequests')}
            title="Go to friend requests"
          /> 
          {this.props.friends.map(friend => {
            return (
              <TouchableWithoutFeedback>
                <FriendsEntry 
                  img={friend.profile_img_url} 
                  name={friend.name}
                /> 
              </TouchableWithoutFeedback>
            ) 
          })} 
        </View> 
      )
    }
  }
}

const mapStateToProps = (store) => {
  return {
    friends: store.Friends.friends
   }
 }

 const friendDispatch = (dispatch) => {
   return {
     actions: bindActionCreators(friendActions, dispatch),
   }
 }

export default connect(Friends;