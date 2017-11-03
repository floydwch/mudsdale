import React from 'react'


export default ({topic, handleUpvote, handleDownvote}) => (
  <li>
    {topic.votes}
    <button onClick={handleUpvote}>+1</button>
    <button onClick={handleDownvote}>-1</button>
    {topic.title}
  </li>
)
