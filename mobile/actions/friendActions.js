import axios from 'axios'

export const getFriends = (userId) => {
  return function(dispatch) {
    axios.get('/api/friend/get/' + userId)
    .then(({ data }) => {
      dispatch({type: 'GET_FRIEND_LIST', payload: data});
    })
    .catch(err => {
      dispatch({type: 'FRIEND_LIST_FAIL', payload: err})
    })
  }
}