import './App.css';
import {createStore} from 'redux';
import {Provider,connect} from 'react-redux';
import React from 'react';
import {saveState,loadState} from './localStorage';
import {notesReducer} from './reducers';
import NotesApp from './components/notesApp';
import {addNote} from './action';



//define persisted state
const persistedState = loadState();


// define redux store
const store = createStore(notesReducer,persistedState);
store.subscribe(()=>{
  saveState(store.getState())
});



//define map state to props
const mapStateToProps = (state) =>{
  return {
    notes:state
  }
};

//define disptach to props
const mapDispatchToProps = (dispatch)=>{
  return {
    addNewNotes: (note)=>{
      dispatch(addNote(note))
    }
  }
};

//define react-redux connect
const Container = connect(mapStateToProps,mapDispatchToProps)(NotesApp);



//App wrapping everything
function App() {
  return (
    <Provider store={store}>
      <Container/>
    </Provider>
  );
}

export default App;
