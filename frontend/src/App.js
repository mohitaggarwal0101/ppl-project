import React from 'react';
import './App.css';
import Main from './main.js';
import Header from './header.js';
import Footer from './footer.js';
import Hooks from './hooks.js';
import Example from './example'

class App extends React.Component{
  constructor(props){
    super(props);

    this.state={
      num: 1,

      temp:true,
      date:new Date(),

      err:false,

      d1:"",
      d2:""
    } 
  }

  render(){ 
  return (
    <div>
     {/* <Hooks/> */}
      <Main/>
      {/* <Example/> */}
    </div>

  )
  }
}

export default App;
