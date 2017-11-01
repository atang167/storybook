import key from '../../sensitive.json'

import axios from 'axios'

export const getFriends = (userId) => {
  return function(dispatch) {
    axios.get(key.flask_server + 'api/get_all_friends?userId=' + userId)
    .then((response) => {
      dispatch({type: 'GET_FRIEND_LIST', payload: response.data.data});
    })
    .catch(err => {
      dispatch({type: 'FRIEND_LIST_FAIL', payload: err})
    })
  }
}