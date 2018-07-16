import React, {Component} from 'react';

const FlashCardsWindow = (props) => {
  return (
    <div className='card-window' align="center">
      { props.currentCard }
    </div>
  )
}

export default FlashCardsWindow;
