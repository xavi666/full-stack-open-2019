import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const voteAnecdote = (anecdote) => {
    props.vote(anecdote.id);
    props.showNotification(`You voted '${anecdote.content}'`)
    setTimeout(() => {
      props.hideNotification();
    }, 5000);
  }

  return (
    <div>
      {props.anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes.filter(
    anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );
} 


const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state),
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  showNotification,
  hideNotification,
  vote
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
