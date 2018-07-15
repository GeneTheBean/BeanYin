import React, {Component} from 'react';
import StudySets from './study_sets.js';
import TrainerWindow from './trainer_window';

export default class Trainer extends Component {

  render() {
    return (
      <div>
        <StudySets />
        <TrainerWindow />
      </div>
    )
  }
}
