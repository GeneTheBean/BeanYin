import React, {Component} from 'react';

export default class StudySets extends Component {
  activeTitle = 'study-set-item list-group-item active';
  inactiveTitle = 'study-set-item list-group-item';

  constructor(props) {
    super();
    props.fetchStudySets();
  }

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

    return(
      <div className='col-sm-4' align='center'>
        <h3> Your Study Sets </h3>
        <ul className='list-group'>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}
