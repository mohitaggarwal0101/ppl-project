import React from 'react';


export default class Child extends React.Component{
    constructor(props){
        super(props);

    };

    handleChange=(event)=>{
        this.props.Change(event.target.name,event.target.value);
    }



    render(){
        
        return(
            <div>
        {/* <h1>{this.props.first}</h1>
    <h1>{this.props.last}</h1> */}

    <div>
         {/* <h1>{this.state.fname}</h1> */}
         FIRST NAME:<br/>
             <input type="text" name="fname" onChange={this.handleChange}/><br/>

            {/* {console.log(this.state.fname,"   ",this.state.lname)} */}
           

         {/* <h1>{this.state.lname}</h1> */}

         LAST NAME:<br/>
             <input type="text" name="lname" onChange={this.handleChange}/>

             </div>

    </div>


        
        
        )
    }
}