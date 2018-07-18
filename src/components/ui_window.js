import React, {Component} from 'react';

const UIWindow = (props) => {

  return (
    <div className = 'menu-bar'>
      Menu Bar
      <input className = 'shuffle-icon' type='image'
             title='shuffle'
             src= {props.url}
             onClick={() => props.toggleShuffle()} />
    </div>
  )

}

export default UIWindow;
