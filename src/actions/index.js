const CLIENT_ID = 'GD6kTTtNfy';
const API_URL = `https://api.quizlet.com/2.0/users/thedupemaster/sets?client_id=${CLIENT_ID}&whitespace=1`;

export const FETCH_SETS = 'FETCH_SETS'
export const STUDY_SET_SELECTED = 'STUDY_SET_SELECTED';

export function fetchStudySets() {
  var request = // SEND REQUEST
    fetch(API_URL).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    }).then((data) => {
        return data;
    });

  return {
    type: FETCH_SETS,
    payload: request
  }
}

export function selectSet(studySet) {
  return {
    type: STUDY_SET_SELECTED,
    payload: studySet
  }
}
