import React from 'react';

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

  export default NotesApp;