export default function(state = null, action) {

  switch(action.type) {
    case 'STUDY_SET_SELECTED': {
      return action.payload;
    }
  }
  return state;
}
