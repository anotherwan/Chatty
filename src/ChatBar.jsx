import React, {Component} from 'react';

class ChatBar extends Component {

  onKeyUpUser = ((event) => {
    if (event.key === 'Enter'){
      this.props.handleUserChange(event.target.value);
    }
  })

  onKeyUpMsg = ((event) => {
    if (event.key === 'Enter'){
      this.props.handleUserChange(document.getElementById('username').value);
      this.props.handleNewMessage(event.target.value);
      document.getElementById('new-message').value = '';
    }
  })

  render() {
    return (
      <footer>
        <input
          id="username"
          type="text"
          placeholder="Anonymous"
          onKeyUp={this.onKeyUpUser}
        />
        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          onKeyUp={this.onKeyUpMsg}
        />
      </footer>
    );
  }
}
export default ChatBar;
