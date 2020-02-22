import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const createAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addAnecdote(content)
    props.showNotification(`Anecdote '${content}' created`)
    setTimeout(() => {
      props.hideNotification()
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addAnecdote,
  showNotification,
  hideNotification,
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)