import React, {Component} from 'react';

export default class StudySetItem extends Component {

  constructor(props) {
    super(props);
    this.state = {text: props.definition};
  }

  render() {
    return (
        <div className='card media'>
            <div className='media-middle'>
            <img className='thumbnail media-object'
                 src={this.props.url}
                 onClick = {() => {
                   var text = (this.state.text == this.props.definition) ? this.props.term: this.props.definition;
                   this.setState({text: text}); }}/>
          </div>
          <div className='media-body'>
            <div className='card-description'>
                <div className='media-heading'>{this.state.text}</div>
            </div>
          </div>
        </div>
      );
  }
}
