import React, {Component} from 'react';

export default class StudySets extends Component {
  activeTitle = 'study-set-item list-group-item active';
  inactiveTitle = 'study-set-item list-group-item';

  renderList() {
    return this.props.studySets.map((studySet) => {
      var className = (studySet == this.props.activeSet) ? this.activeTitle: this.inactiveTitle;

      return (
          <li
              key = {studySet.id}
              title = {studySet.title}
              onClick={() => {
                this.props.selectSet(studySet)
                this.setState({activeSet: studySet});
              }}
              className={className}>{studySet.title}
          </li>
      );
    });
  }

  render() {
    if(this.props.studySets.map) {
      return(
        <div className='row'>
          <div className = 'study-sets col-md-12' align='center'>
            <h4> Quizlet Study Sets </h4>
            <ul className='set-list list-group'>
              {this.renderList()}
            </ul>
          </div>
        </div>
      );
    }

    else return (
      <div>
        <h4 className="text-danger">The API request could not be made. Please use a CORS extension for your Browser and try again.
        </h4>
        <h5><a href='https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/?src=recommended'>Firefox Add-on CORS Everywhere</a>
        </h5>
        <h5><a href='https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en'>Chrome Extension Allow-Control-Allow-Origin: *</a>
        </h5>
      </div>
    )
  }
}
