import React from 'react'

class Second extends React.Component{

    constructor(props){
        super(props);

        console.log("props of second ++++++++ 2 ",this.props)
    }

    componentWillUnmount(){
        console.log("componet Did unmount 2");
    }

    render(){
        return(

    <div>
        <h1>
            second
        </h1>
    </div>
        )}
}

export default Second;