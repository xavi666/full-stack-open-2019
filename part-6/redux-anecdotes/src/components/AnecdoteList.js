import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.store.getState().anecdotes

  const voteAnecdote = (anecdote) => {
    props.store.dispatch(vote(anecdote.id));
    props.store.dispatch(
      showNotification(`You voted '${anecdote.content}'`)
    );
    setTimeout(() => {
      props.store.dispatch(hideNotification());
    }, 5000);
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
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

export default AnecdoteList
