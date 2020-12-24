// define action type
export const ADD = 'ADD';

//define action creator
export const addNote = (note) =>({
  type:ADD,
  note
});