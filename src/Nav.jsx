import React from 'react';

const Nav = (props) => {
  return (
    <nav>
      <h1>Chatty</h1>
      <span>{props.numberOfClients}</span>
    </nav>
  )
}

export default Nav;
