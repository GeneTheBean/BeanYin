import React, {Component} from 'react';
import StudySets from '../components/study_sets.js';
import TrainerWindow from '../components/trainer_window';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchStudySets} from '../actions/index';
import {selectSet} from '../actions/index';

class Trainer extends Component {
  shuffleIcons = ['/img/icons/shuffle-icon-off.png', '/img/icons/shuffle-icon-on.png'];
  responseIcons = ['/img/icons/blank.png', '/img/icons/x_mark.png', '/img/icons/check_mark.png'];

  render() {
    return (
      <div>
        <StudySets studySets = {this.props.studySets}
          fetchStudySets = {this.props.fetchStudySets}
          selectSet = {this.props.selectSet}
          activeSet = {this.props.activeSet} />
        <TrainerWindow activeSet = {this.props.activeSet}
          shuffleIcons = {this.shuffleIcons}
          responseIcons = {this.responseIcons} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    studySets: state.studySets,
    activeSet: state.activeSet
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchStudySets: fetchStudySets,
      selectSet: selectSet
    },
    dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Trainer);
