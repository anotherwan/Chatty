const express = require ('express');
const SocketServer = require('ws');
const uuid = require('node-uuid');

const PORT = 4000;

const server = express()
  .use(express.static('public'))
  .listen(PORT, 'localhost', () => console.log(`Listening on ${PORT}`));

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


//message from App (newMessage) first gets received below, then it gets parsed. Then we call the broadcast function within wss and pass it the stringified parsedMsg.
wss.on('connection', (ws) => {
  console.log('Client Connected');

  wss.broadcast(JSON.stringify({
    type: 'numberOfClients',
    numberOfClients: wss.clients.size
  }));

  ws.on('message', (data) => {
    let parsedData = JSON.parse(data)
    switch(parsedData.type) {
      case "newChatMessage":
        let submittedMsg = {
          id: uuid.v4(),
          type: 'chatMessage',
          username: parsedData.username,
          content: parsedData.content
        }
        wss.broadcast(JSON.stringify(submittedMsg))
        break;
      case "changeUsername":
        let newPost = {
          id: uuid.v4(),
          type: 'chatNotification',
          content: `${parsedData.oldUser} changed their name to ${parsedData.currentUsername}`
        }
        wss.broadcast(JSON.stringify(newPost))
        break;
      // case "changeUserColor":
      //   let
    }
  })


  ws.on('close', () => console.log('Client disconnected'));
});
