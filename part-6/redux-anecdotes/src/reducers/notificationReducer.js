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

export const showNotification = (content) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: {
      content
    }
  }
}

export const hideNotification = (content) => {
  return {
    type: 'HIDE_NOTIFICATION',
    data: {
      content
    }
  }
}

export default reducer
