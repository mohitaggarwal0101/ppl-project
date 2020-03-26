import React from 'react';
import Axios from 'axios';
import Img from 'react-image';
// const Img = require('react-image');
// import Logo from './posts/rsz_4.png'

export default class Upload extends React.Component{
    constructor(props){
        super(props);

        this.state={
            postname:"",
            category:this.props.AllCategories[0].category,
            file:"",
            date:"",
            time:"",
            email:"",
            username:"",

            likes:0,
            comments:0,
            
            array:[]
            
            
        }
        console.log("user is !!!!!!!!!",localStorage.username);
    console.log("user is !!!!!!!!!",localStorage.email);
    console.log("user is !!!!!!!!!",localStorage.password);

    this.setState({email:localStorage.email});
    this.setState({username:localStorage.username});

    console.log("state issssssssssssswwwwwwwwwww",this.state);
    }

    handle = (event)=>{
        

        //  this.setState({item:event.target.value});

        console.log("value is +++++++",event.target.value);
       // console.log("item is +++++",item);

      
           var item =  this.state.array;
           item.push(event.target.value);

           this.setState({array:item})

            

        console.log(this.state.array);
    }

    handleChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });

        console.log("value is $$$$$$",val);
    
      };

    handleChangeFile= event =>{

        console.log("image is ++++++++++",event.target.files[0])

        

        this.setState({
            file:event.target.files[0]
        })

        // console.log("image is ------------",this.state.file)

        var dat = new Date();

       this.setState({date: dat.toString().slice(8,10) + " " + dat.toString().slice(4,7) + " " + dat.toString().slice(11,15) })
       this.setState({time:dat.toString().slice(16,24)});

    //    this.setState({emailid:localStorage.email});

       

       
    }
    
      handleSubmit = (event) => {
    
    
        event.preventDefault();

        console.log("date isssssssssssssssss",this.state)

        var temp = this.state.array;

        temp.push(this.state.file.name);

        this.setState({array:temp});

        console.log("Mail is ------- ",localStorage.email);

        console.log("state ------- ",this.state);



        
         const formData =  new FormData();
         formData.append("image",this.state.file)
         formData.append("category",this.state.category)
         formData.append("postname",this.state.postname)
         formData.append("date",this.state.date)
         formData.append("time",this.state.time)
         formData.append("email",localStorage.email)
         formData.append("username",localStorage.username)
         formData.append("likes",this.state.likes)
         formData.append("comments",this.state.comments)



        //  console.log('form data---',formData);

            const config = {
                headers:{
                    "content-type": "multipart/form-data"
                }
            }

         Axios.post("http://localhost:9000/post/upload", formData,config).then(function (response) {
    
           console.log("upload response++++++++",response.data);
          
    
         })

         
    
      };

    render(){
        return(
        <div>
            <h1>Upload post:</h1>
            <form onSubmit={this.handleSubmit}>
                POST NAME:<br/>
                <input type="text" name="postname" onChange={this.handleChange} required/><br/><br/>

                CATEGORY:<br/>
                <select name="category" onChange={this.handleChange} required>
                    {/* <option value="CATS">CATS</option>
                    <option value="DOGS">DOGS</option>
                    <option value="BIRDS">BIRDS</option>
                    <option value="RABBITS">RABBITS</option>
                    <option value="OTHERS">OTHERS</option> */}

                    {
                        this.props.AllCategories.map((item)=>{
                            return (<option value={item.category} >{item.category}</option>)
                        })
                    }
                </select><br/><br/>

                image:<br/>
                <input type="file" name="file" onChange={this.handleChangeFile} required/><br/><br/>

                <input type="submit" value="Post it"/>
            </form>
            
        </div>  
        )
    }
}

{/* <h1>hello</h1>

<input type="text" name="array" onChange={this.handle}/>



<ol>
    {
        this.state.array.map(item=> <li>{item}</li>)
    }
</ol> */}