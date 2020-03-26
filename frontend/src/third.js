import React from 'react'

class Third extends React.Component{

    constructor(props){
        super(props);

        console.log("props of third ++++++++ ",this.props)
    }

    render(){

        const n = this.props.match.params.number
        return(

    <div>
        <h1>
            {n}
        </h1>
    </div>
        )}
}

export default Third;