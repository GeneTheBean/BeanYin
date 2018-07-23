import React, {Component} from 'react';

const UserButtons = (props) => {
  return (
    <div align='center'>
    <input className = 'rewind-icon' type='image'
      src= {'/img/icons/rewind.png'}
      onClick={() => props.rewindCard()}
      title='rewind'/>
    <input className = 'play-icon' type='image'
        src= {'/img/icons/play.png'}
        onClick={() => props.playSound()}
        title='play'/>
    <input className = 'skip-icon' type='image'
      src= {'/img/icons/skip.png'}
      onClick={() => props.skipCard()}
      title='skip'/>
    </div>
  );
}

export default UserButtons;
