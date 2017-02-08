import React, {Component} from 'react';

class ChatBar extends React.Component {


  onKeyUp = ((event) => {
    if (event.key === 'Enter'){
      this.props.addNewMessage(event.target.value);
    }
  })

  render() {
    return (
      <footer>
        <input
          id="username"
          type="text"
        />
        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          onKeyUp={this.onKeyUp}
        />
      </footer>
    );
  }
}
export default ChatBar;
