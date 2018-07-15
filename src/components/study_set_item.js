import React from 'react';

const StudySetItem = (card) => {

  return (
      <div className='media'>
          <div className='media-middle'>
          <img className='media-object' src={card.url} />
        </div>
        <div className='media-body'>
          <div className='card-description'>
              <div className='media-heading'>{card.definition}</div>
          </div>
        </div>
      </div>
  );
};

export default StudySetItem;
