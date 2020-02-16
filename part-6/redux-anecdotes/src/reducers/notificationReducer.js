const initialState = 'This is a notification'

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return [...state, action.data]
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

export default reducer
