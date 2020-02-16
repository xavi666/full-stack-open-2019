import React from 'react'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const content = props.store.getState().notification;

  if (content === '') return '';

  return (
    <div style={style}>
      {content}
    </div>
  )
}

export default Notification
