const initialState = ''

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data.content
    case 'HIDE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const showNotification = (content, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: {
        content
      },
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
      });
    }, seconds * 1000)
  }
}

export const hideNotification = (content) => {
  return async dispatch => {
    dispatch({
      type: 'HIDE_NOTIFICATION',
      data: {
        content
      },
    })
  }
}

export default reducer
