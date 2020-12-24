import {ADD} from './action';


//define reducer
export const notesReducer = (state=[],action)=>{
    switch(action.type){
      case ADD:
        return [...state,action.note];
      default:
        return state;
    }
  };

