import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchStudySets} from '../actions/index';
import {selectSet} from '../actions/index';

class StudySets extends Component {

  constructor(props) {
    super();

    props.fetchStudySets();
  }

  renderList() {
    return this.props.studySets.map((studySet) => {
      return (
          <li
              key = {studySet.id}
              title = {studySet.title}
              onClick={() => this.props.selectSet(studySet)}
              className='study-set-item list-group-item'>{studySet.title}
          </li>
      );
    });
  }

  render() {
    console.log(this.props.studySets);
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
