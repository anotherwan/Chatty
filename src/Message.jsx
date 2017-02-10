import React from 'react';

const Message = (props) => {
  return (
    <div className="message">
      <span className="username">{props.username}</span>
      <span className="content">{props.content} </span>
    </div>
  )
}

export default Message;
