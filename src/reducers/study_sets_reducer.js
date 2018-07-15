export default function(state = [], action) {
  switch(action.type) {
    case 'FETCH_SETS':
      return action.payload;
  }
  return state;
}
