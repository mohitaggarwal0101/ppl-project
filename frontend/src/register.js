import React from 'react';
import Axios from 'axios';
import Login from './login';
import {Link} from 'react-router-dom'

export default class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
      fname: "",
      lname: "",

      emailmsg:""
    };

    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });

  };

  handleSubmit = (event) => {

    console.log("register frontend $$$$$$$");

    event.preventDefault();
    console.log("this.state", this.state);


    Axios.post("http://localhost:9000/user/adduser", this.state).then( (response) =>{


      console.log("response",response.data);
    if(response.data == "created"){
      console.log("fdsasda")
      this.props.history.push("/login")

    }
    else
    {
      console.log("exists");

      // document.getElementById("formail").style.color = "red";

      // document.getElementById("div_email").innerHTML = "email already exists";

      this.setState({emailmsg:"email already exists"})
    }
    })
  }

  render() {

    if(localStorage.length === 0)
    {
      localStorage.clear();
    }
    else
    {
      this.props.history.push("/timeline");
    }
    
    return (
      <div>
        <div className="navbar navbar-inverse navbar-fixed-top">
          <div className="navbar-inner">
            <div className="container">
              <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
              <a className="brand" href='#'>PPL</a>
              <div className="pro_info pull-right">
                <div className="pro_icn"><img src="images/pic_small.png" /></div>
                <div className="pro_txt">Me<b className="caret" /></div>
                <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
                  <li><a tabIndex={-1} href="#">My Profile</a></li>
                  <li><a tabIndex={-1} href="#">Message Box</a></li>
                  <li><a tabIndex={-1} href="#">Change Language</a></li>
                  <li className="divider" />
                  <li><a tabIndex={-1} href="#">
                    <input type="text" placeholder="search" />
                  </a></li>
                </ul>
              </div>
              <div className="nav-collapse collapse">
                <ul className="nav">
                  <li className="active"> <a href='#'>Home</a> </li>
                  <li className="active"> <a href='#'>E-Coupons</a> </li>
                  <li className="active"> <a href='#'>E-Brands</a> </li>
                  <li className="active"> <a href='#'>Resuse Market</a> </li>
                  <li className="active"> <a href='#'>Lost and Found</a> </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* header */}
        
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="register_sec">
                <h1>Create An Account</h1>
                <form onSubmit={this.handleSubmit}>
                <ul>
                  <li><span>Username</span><input type="text" name="username" onChange={this.handleChange} required/></li>
                  <li><span>Password</span><input type="password" placeholder="Enter your password" name="password" onChange={this.handleChange} required/></li>
    <li><span>Email</span><input type="email" placeholder="Enter your email" name="email" onChange={this.handleChange} id="formail" required/><div>{this.state.emailmsg}</div></li>
                  <li><span>First Name</span><input type="text" placeholder="Enter your first name" name="fname" onChange={this.handleChange} required/></li>
                  <li><span>Last Name</span><input type="text" placeholder="Enter your last name" name="lname" onChange={this.handleChange} required/></li>
                  <li><input type="checkbox" />I agree to Term &amp; Conditions</li>
                  <li><input type="submit" value="Register"  /></li>
                </ul>
                </form>
                <div className="addtnal_acnt">I already have an account.<Link to="/login" >Login My Account !</Link></div>
              </div>
            </div>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
              <img src="images/img_9.png" alt="" /> </div>
          </div>
        </div>
        <div className="clear" />
        
      </div>
    );
  }
}