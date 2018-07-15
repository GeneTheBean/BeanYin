import React, {Component} from 'react';

export default class FlashCardsWindow extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='card-window' align="center">
        { this.props.currentCard }
      </div>
    )
  }
}
