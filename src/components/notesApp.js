import React from 'react';
import './NotesApp.css';

//notesApp
class NotesApp extends React.Component{
    constructor(props){
      super(props);
      this.state={
        title:'',
        text:''
      };
      this.handleText = this.handleText.bind(this);
      this.handleTitle = this.handleTitle.bind(this);
      this.submitChange = this.submitChange.bind(this);
    }
  
    handleTitle(event){
      this.setState({title:event.target.value});
    }
    
    handleText(event){
        this.setState({text:event.target.value});
    }
    submitChange(){
      this.props.addNewNotes(this.state);
      this.setState({title:'',text:''});
    }
  
    render(){
       
      return(
        <div className="container">
            <div className="new-note">
                <h3>title</h3>
                <input value={this.state.title} onChange={this.handleTitle} className="input-title"/>
                <h3>text/description</h3>
                <textarea value={this.state.text} onChange={this.handleText} className="input-text"/><br/>
                <button onClick={this.submitChange}>add note</button>

            </div>
            <h1 className="notes"> notes</h1>
          <ul>
            {
               this.props.notes.map(
                (note,indx)=>{
                    if(note.title) return(
                        <li key={indx}> 
                        <h2 className="title">{note.title}</h2>
                        <p className="text">{note.text}</p> 
                        </li>
                    )
                    return (null)    
                }
                )
            }
          </ul>
        </div>
      )
    }
  }

  export default NotesApp;