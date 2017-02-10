import React, {Component} from 'react';
// Component = React.Component
import uuid from 'node-uuid';
import Nav from './Nav.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      currentUser: {name: "Anonymous"}, //, userColor: '#a3fd7f'
      messages: []
    };
  }

 _handleNewMessage = (inputMessage) => {
  const newMessage = {
    type: 'newChatMessage',
    username: this.state.currentUser.name,
    content: inputMessage
  }
  this.socket.send(JSON.stringify(newMessage))
  //stringifies new message and sends it to server
 }

  _handleUserChange = (inputUser) => {
    if (this.state.currentUser.name !== inputUser) {
      const userInfo = {
        type: 'changeUsername',
        oldUser: this.state.currentUser.name,
        currentUsername: inputUser
      }
      this.setState({currentUser: {name: inputUser}});
      this.socket.send(JSON.stringify(userInfo))
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:4000');
    this.socket.onmessage = this._onSocketMsg
  }

  _onSocketMsg = (event) => {
    let newData = JSON.parse(event.data)
    if (newData.type === 'numberOfClients') {
      this.setState({numberOfClients: newData.numberOfClients})
    } else {
      const messages = [...this.state.messages, newData];
      this.setState({messages: messages})
    }
  }

  render() {
    return (
    <div>
      <Nav numberOfClients={this.state.numberOfClients}/>
      <MessageList
        messages={this.state.messages}
      />
      <ChatBar
        currentUser={this.state.currentUser}
        handleUserChange={this._handleUserChange}
        handleNewMessage={this._handleNewMessage}
      />
    </div>
  );
  }
}

export default App;
