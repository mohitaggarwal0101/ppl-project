import React from 'react';
import Child from './child';

export default class Parent extends React.Component{
    constructor(props){
        super(props);

        this.state={
            fname:"",
            lname:""
        }
    }

    handleChange =(nam,val)=> {
        // var nam = event.target.name;
        // var val = event.target.value;

        this.setState({
            [nam]:val
        })

    }

    render(){
        return(
            <div>
            <Child Change= {this.handleChange}/>

        <h1>{this.state.fname}</h1>
        <h1>{this.state.lname}</h1>

         {console.log(this.state.fname,"   ",this.state.lname)} 

        </div>
        )
    }
}