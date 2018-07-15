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
              className='list-group-item'>{studySet.title}
          </li>
      );
    });
  }

  render() {
    return(
      <ul className='list-group col-sm-4'>
        {this.renderList()}
      </ul>
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
