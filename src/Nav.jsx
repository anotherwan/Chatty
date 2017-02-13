import React from 'react';

const Nav = (props) => {
  return (
    <nav>
      <h1> - The Chattery - </h1>
      <span><strong>{props.numberOfClients} User(s) Online</strong></span>
    </nav>
  )
}

export default Nav;
