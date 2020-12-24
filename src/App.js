
import './App.css';
import {createStore} from 'redux';
import {Provider,connect} from 'react-redux';
import React from 'react';


const loadState = () =>{
  try{
    const serializedState  = localStorage.getItem('state');
    if(serializedState===null){
      return []
    }
    return JSON.parse(serializedState);
  }
  catch(err){
    return undefined;
  }
};

const saveState = (state)=>{
  try{
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state',serializedState);
  }
  catch(err){
    //ignore
  }
};


// define action type
const ADD = 'ADD';

//define action creator
const addNote = (note) =>({
  type:ADD,
  note
});

//define reducer
const notesReducer = (state=[],action)=>{
  switch(action.type){
    case ADD:
      return [...state,action.note];
    default:
      return state;
  }
};


//define persisted state
const persistedState = loadState();


// define redux store
const store = createStore(notesReducer,persistedState);
store.subscribe(()=>{
  saveState(store.getState())
});


//notesApp
class NotesApp extends React.Component{
  constructor(props){
    super(props);
    this.state={
      input:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitChange = this.submitChange.bind(this);
  }

  handleChange(event){
    this.setState({input:event.target.value});
  }

  submitChange(){
    this.props.addNewNotes(this.state.input);
    this.setState({input:''});
  }

  render(){
    console.log(this.props);
    return(
      <div>
        <input value={this.state.input} onChange={this.handleChange}/>
        <button onClick={this.submitChange}>submit</button>
        <ul>
        {this.props.notes.map(
            (note,indx)=>
                (<li key={indx}> {note} </li>)
          )
        }
        </ul>
      </div>
    )
  }
}

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
