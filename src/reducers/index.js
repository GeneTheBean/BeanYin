import { combineReducers } from 'redux';
import StudySetsReducer from './study_sets_reducer';
import SetSelectReducer from './select_set_reducer';

const rootReducer = combineReducers({
  studySets : StudySetsReducer,
  activeSet : SetSelectReducer
});

export default rootReducer;
