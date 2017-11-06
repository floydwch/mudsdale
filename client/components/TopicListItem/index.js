import React from 'react'


export default function TopicListItem({
  topic, handleUpvote, handleDownvote
}) {
  return (
    <li>
      <span className="topic-list-item__votes">{topic.votes}</span>
      <button onClick={handleUpvote}>+1</button>
      <button onClick={handleDownvote}>-1</button>
      <span className="topic-list-item__title">{topic.title}</span>
    </li>
  )
}
