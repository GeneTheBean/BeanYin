import React, { Component } from 'react';
import characterMap from '../pinyin_alphabet';

export default class PinYinTextBar extends Component {
  constructor(props) {
      super(props);

      this.state = { term: '' };

      this.onInputChange = this.onInputChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    var inputString = event.target.value;
    var inputLength = inputString.length;
    var buildString = '';
    var addLast = true;

    if(inputLength > 1) {
      for(var i = 0;i < inputLength - 1;i++) {
        var currentChar = inputString.charAt(i);
        var nextChar = inputString.charAt(i + 1);
        var character = characterMap.get(currentChar + nextChar);

        if(this.isAlpha(currentChar)
            && (this.isTone(nextChar) || currentChar == 'u' && nextChar == 'u')
            && character != undefined)
        {
            buildString += characterMap.get(currentChar + nextChar);
            addLast = false;
        }

        else {
          buildString += currentChar;
        }
      }
      if(addLast) {
        buildString += inputString.charAt(inputLength - 1);
      }
      this.setState({term: buildString});
    }

    else
      this.setState({term: inputString});
  }

  isAlpha(ch){
    if(ch == 'ü') return true;
    return /^[A-Z]$/i.test(ch);
  }

  isTone(ch) {
    let int = parseInt((ch));
    return (Number.isInteger(int) && int >= 1 && int <= 4);
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.onInputSubmit(this.state.term);
    this.setState({term: ''});
  }

  render() {
    return (
      <div align='center'>
        <form onSubmit={this.onFormSubmit} className="text-bar input-group">
          <input
            className="form-control"
            value={this.state.term}
            onChange={this.onInputChange} />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">Submit</button>
          </span>
        </form>
      </div>
    );
  }
}
