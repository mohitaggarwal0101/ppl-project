import React from 'react';

class AddCategory extends React.Component{
    constructor(props){
        super(props);

        this.state={
            category:""

        }
    }

    handleChange=(event)=>{
        this.setState({category:event.target.value})
    }

    render(){
        return(

            <div>

                <h1>{this.state.category}</h1>
                <input type="text" onChange={this.handleChange}/>
            </div>
        )
    }
}

export default AddCategory;