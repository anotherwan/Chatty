const express = require ('express');
const SocketServer = require('ws');
const uuid = require('node-uuid');

const PORT = process.env.PORT || 4000;

const server = express()
  .use(express.static('public'))
  .listen(PORT);

const wss = new SocketServer.Server({server});
//wss is the web socket server for everyone and ws is for a single client

//This function named broadcast is defined below. SocketServer has its own states. If state is OPEN, each client who has a ready state (ws(client)) will get sent the parsedMsg (stringified).
wss.broadcast = (parsedMsg) => {
  wss.clients.forEach((client) => {
    if (client.readyState === SocketServer.OPEN) {
      client.send(parsedMsg)
    }
  })
}

assignColor = (color) => {
  const colors = ['#75E72F', '#F92672', '#AE81FF', '#FD971F', '#66D9EF']
  return colors[Math.floor(Math.random() * colors.length)]
}

//message from App (newMessage) first gets received below, then it gets parsed. Then we call the broadcast function within wss and pass it the stringified parsedMsg.

wss.on('connection', (ws) => {
  console.log('Client Connected');

  //wss.clients is a set therefore use .size and not .length
  wss.broadcast(JSON.stringify({
    type: 'numberOfClients',
    numberOfClients: wss.clients.size
  }));

  let initialUser = {
    type: 'assigningColor',
    userData: {
      userID: uuid.v4(),
      assignedColor: assignColor()
    }
  }
  ws.send(JSON.stringify(initialUser))

  ws.on('message', (data) => {
    let parsedData = JSON.parse(data)
    switch(parsedData.type) {
      case 'newChatMessage':
        let submittedMsg = {
          id: uuid.v4(),
          type: 'chatMessage',
          username: parsedData.username,
          userColor: parsedData.userColor,
          content: parsedData.content
        }
          wss.broadcast(JSON.stringify(submittedMsg))
        break;
      case 'changeUsername':
        let newPost = {
          id: uuid.v4(),
          type: 'chatNotification',
          userColor: parsedData.userColor,
          content: `${parsedData.oldUser} changed their name to ${parsedData.currentUsername}`
        }
        wss.broadcast(JSON.stringify(newPost))
        break;
      }
  })
  ws.on('close', () => console.log('Client disconnected'));
});
