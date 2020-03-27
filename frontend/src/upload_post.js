import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Img from 'react-image';
// const Img = require('react-image');
// import Logo from './posts/rsz_4.png'

export default function Upload (props){
    // constructor(props){
    //     super(props);

    //     this.state={
    //         postname:"",
    //         category:this.props.AllCategories[0].category,
    //         file:"",
    //         date:"",
    //         time:"",
    //         email:"",
    //         username:"",

    //         likes:0,
    //         comments:0,
            
    //         array:[]
            
            
    //     }
    //     console.log("user is !!!!!!!!!",localStorage.username);
    // console.log("user is !!!!!!!!!",localStorage.email);
    // // console.log("user is !!!!!!!!!",localStorage.password);

    // this.setState({email:localStorage.email});
    // this.setState({username:localStorage.username});

    // console.log("state issssssssssssswwwwwwwwwww",this.state);
    // }

    const [postname,setPostname] = useState("");
    const [category,setCategory] = useState(props.AllCategories[0].category);
    const [file,setFile] = useState("");
    const [date,setDate] = useState("");
    const [time,setTime] = useState("");
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [likes,setLikes] = useState(0);
    const [comments,setComments] = useState(0);

    useEffect(()=>{
        setEmail(localStorage.email);
        setUsername(localStorage.username);

        console.log("categories areeeee",category);
    },[])

    // handle = (event)=>{
        

    //     //  this.setState({item:event.target.value});

    //     console.log("value is +++++++",event.target.value);
    //    // console.log("item is +++++",item);

      
    //        var item =  this.state.array;
    //        item.push(event.target.value);

    //        this.setState({array:item})

            

    //     console.log(this.state.array);
    // }

    // handleChange = (event) => {
    //     let nam = event.target.name;
    //     let val = event.target.value;
    //     this.setState({ [nam]: val });

    //     console.log("value is $$$$$$",val);
    
    //   };

    const handleChangeFile = event =>{

        console.log("image is ++++++++++",event.target.files[0])

        

        // this.setState({
        //     file:event.target.files[0]
        // })

        setFile(event.target.files[0]);

        // console.log("image is ------------",this.state.file)

        var dat = new Date();

    //    this.setState({date: dat.toString().slice(8,10) + " " + dat.toString().slice(4,7) + " " + dat.toString().slice(11,15) })
    //    this.setState({time:dat.toString().slice(16,24)});

       setDate( dat.toString().slice(8,10) + " " + dat.toString().slice(4,7) + " " + dat.toString().slice(11,15) );
       setTime( dat.toString().slice(16,24) );

    //    this.setState({emailid:localStorage.email});

       

       
    }
    
      const handleSubmit = (event) => {
    
    
        event.preventDefault();

        // console.log("date isssssssssssssssss",this.state)

        // var temp = this.state.array;

        // temp.push(this.state.file.name);

        // this.setState({array:temp});

        console.log("Mail is ------- ",localStorage.email);

        // console.log("state ------- ",this.state);



        
         const formData =  new FormData();
         formData.append("image",file)
         formData.append("category",category)
         formData.append("postname",postname)
         formData.append("date",date)
         formData.append("time",time)
         formData.append("email",localStorage.email)
         formData.append("username",localStorage.username)
         formData.append("likes",likes)
         formData.append("comments",comments)



        //  console.log('form data---',formData);

            const config = {
                headers:{
                    "content-type": "multipart/form-data"
                }
            }

         Axios.post("http://localhost:9000/post/upload", formData,config).then(function (response) {
    
           console.log("upload response++++++++",response.data);
          
    
         })

         
    
      }

        return(
        <div>
            <h1>Upload post:</h1>
            <form onSubmit={(event)=>handleSubmit(event)}>
                POST NAME:<br/>
                <input type="text" name="postname" onChange={(event)=>setPostname(event.target.value)} required/><br/><br/>

                CATEGORY:<br/>
                <select name="category" onChange={(event)=> setCategory(event.target.value)} required>
                    {/* <option value="CATS">CATS</option>
                    <option value="DOGS">DOGS</option>
                    <option value="BIRDS">BIRDS</option>
                    <option value="RABBITS">RABBITS</option>
                    <option value="OTHERS">OTHERS</option> */}

                    {
                        props.AllCategories.map((item)=>{
                            return (<option value={item.category} >{item.category}</option>)
                        })
                    }
                </select><br/><br/>

                image:<br/>
                <input type="file" name="file" onChange={(event)=>handleChangeFile(event)} required/><br/><br/>

                <input type="submit" value="Post it"/>
            </form>
            
        </div>  
        )
    
}

{/* <h1>hello</h1>

<input type="text" name="array" onChange={this.handle}/>



<ol>
    {
        this.state.array.map(item=> <li>{item}</li>)
    }
</ol> */}