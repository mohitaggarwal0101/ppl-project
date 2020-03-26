import React from 'react'
import Second from './second';

class First extends React.Component {

    constructor(props) {
        super(props);

        // console.log("props of first ++++++++ ",this.props)

        this.state = {
            count: 1
        }

        console.log("constructor 1");
    }



    componentDidMount() {
        console.log("coponentDidMount 1");
    }

    static getDerivedStateFromProps(props, state) {
        console.log("getDerivedStateFromProps 1");
        return {}
    }

    handleChange = () => {
        this.setState({ count: 2 });
    }



    shouldComponentUpdate(nextProps, nextState) {

        console.log(nextState.count);
        console.log(nextProps.count)
        console.log(this.state.count);
        console.log("shouldComponentUpdate 1")

        return true;
    }

    componentDidUpdate() {
        console.log("component Did Update 1")
    }

    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //     console.log(prevState.count);
    //     console.log(prevProps)
    //     console.log(this.state.count);
    //     console.log("get snap shot before update 1");

    //     return 1;
    // }


    render() {

        console.log("render");

        return (

            <div>
                <h1>
                    first
        </h1>
                {console.log("if second")}
                {this.state.count === 1 && <Second />}
                {console.log("NO second")}

                <button onClick={this.handleChange}>click me</button>


            </div>
        )
    }
}

export default First;