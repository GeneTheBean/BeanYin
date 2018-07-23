import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchStudySets} from '../actions/index';
import {selectSet} from '../actions/index';

class StudySets extends Component {
  activeTitle = 'study-set-item list-group-item active';
  inactiveTitle = 'study-set-item list-group-item';

  constructor(props) {
    super();
    this.state = {activeSet: null};
    props.fetchStudySets();
  }

  renderList() {
    return this.props.studySets.map((studySet) => {
      var className = (studySet == this.state.activeSet) ? this.activeTitle: this.inactiveTitle;

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

function mapStateToProps(state) {
  return {
    studySets: state.studySets
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchStudySets: fetchStudySets,
      selectSet: selectSet
    },
    dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StudySets);
