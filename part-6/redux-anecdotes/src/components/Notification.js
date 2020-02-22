import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const content = props.notification

  if (content === '') return '';

  return (
    <div style={style}>
      {content}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)