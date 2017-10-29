import React, { Component } from 'react'

import { addNavigationHelpers } from 'react-navigation'
import { ProfileNavigator } from '../navigationConfig'

import { connect } from 'react-redux'

class ProfileNav extends Component {
  static navigationOptions = {
    tabBarIcon: ''
  }

  render() {
    const { profileState, dispatch } = this.props
    return (
      <ProfileNavigator
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: profileState
          })
        }
        screenProps={this.props.userId}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profileState: state.Profile,
    userId: state.Auth.userId
  }
}

export default connect(mapStateToProps)(ProfileNav)