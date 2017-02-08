import React, {Component} from 'react';

class MessageList extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <h1>Chatty</h1>
        </nav>
      <div id="message-list">
        {this.props.messages.map((message, i) => {
          return (
          <div key={message.id}>
            <div className="message" />
            <span className="username">{message.username}</span>
            <span className="content">{message.content} </span>
          </div>
        )
        }
    )}

        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </div>
      </div>
    );
  }
}
export default MessageList;
