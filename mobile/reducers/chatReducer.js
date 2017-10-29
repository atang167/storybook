const initialState = {
  currentRoom: '',
  rooms: [],
}

const chatReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'ENTER_ROOM': {
      return Object.assign({}, state, {
        currentRoom: action.payload,
      })
    }
    case 'EXIT_ROOM': {
      return Object.assign({}, state, {
        currentRoom: '',
      })
    }
    case 'GET_ALL_ROOMS': {
      return Object.assign({}, state, {
        rooms: action.payload,
      })
    }
    case 'ROOM_LIST_FAIL': {
      return Object.assign({}, state, {
        err: action.payload,
      })
    }
    default: {
      return state
    }
  }
}

export default chatReducer;