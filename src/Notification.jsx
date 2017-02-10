import React, {Component} from 'react';

const Notifications = (props) => {

  return (
   <div className="message system">
     {props.content}
   </div>
  )
}
export default Notifications;
