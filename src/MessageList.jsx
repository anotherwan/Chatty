import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    return (
      <div id="message-list">
        {this.props.messages.map((message) => {
          switch(message.type) {
            case 'chatMessage':
              return (
                <Message
                  key={message.id}
                  username={message.username}
                  content={message.content}
                />
              )
            case 'chatNotification':
              return (
                <Notification
                  key={message.id}
                  content={message.content}
                />
              )
          }
        })}
      </div>
    )
  }
}

export default MessageList;
