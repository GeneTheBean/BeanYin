import React, {Component} from 'react';

const ResponseBar = (props) => {
  var url = props.url;

  return (
    <div className = 'response-bar' align="center">
      <img className = 'response-img' src = {url} />
    </div>
  )
}

export default ResponseBar;
