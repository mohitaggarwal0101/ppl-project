import React from 'react';
import Axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import {
	withRouter
} from 'react-router-dom';

export default class Login extends React.Component{
  constructor(props) {
    super(props);
    console.log("props  are   +++++",props);
    this.state = {
      email: "",
      password: "",

      emailmsg:"",
      passwordmsg:""
    };

    if(localStorage.length === 0)
    {
      localStorage.clear();
    }
    else
    {
      this.props.history.push("/timeline");
    }
  }



  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });

  };

  handleSubmit = (event) => {

    console.log("client side %%%%%");

    event.preventDefault();
    console.log("this.state", this.state);

    
    Axios.post("http://localhost:9000/user/login", this.state).then((response) =>{

      console.log("ccccccccccccccccccc",response.data);
       
      console.log("cbjmdc +++++++++++++++",response.data);

      if(response.data === "incorrect email")
      {
        console.log("incorrect email");

        // document.getElementById("foremail").style.color = "red";
        // document.getElementById("forpassword").style.color = "black";

        // document.getElementById("div_mail").innerHTML = "incorrect email-id";
        // document.getElementById("div_password").innerHTML = "";

        this.setState({emailmsg:"incorrect email-id"});
        this.setState({password:""});

      }
      else if(response.data === "incorrect password")
      {
        console.log("incorrect password");

        // document.getElementById("forpassword").style.color = "red";
        // document.getElementById("foremail").style.color = "black";

        // document.getElementById("div_mail").innerHTML = "";
        // document.getElementById("div_password").innerHTML = "incorrect password";

        this.setState({passwordmsg:"incorrect password"});
        this.setState({emailmsg:""});

      }
      else
      {
        console.log("correct ++++++++++",response.data[0]);

        localStorage.setItem('email',response.data[0].email);
        // localStorage.setItem('password',response.data[0].password);
        localStorage.setItem('username',response.data[0].username);

        console.log("user is !!!!!!!!!",response.data[0].username)
        console.log("user is !!!!!!!!!",localStorage.username)

        console.log("correct data");
        this.props.history.push('/timeline');

      }

    })

  };

  render(){

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
              <div className="login_sec">
                <h1>Log In</h1>
                <form onSubmit={this.handleSubmit}>
                <ul>
    <li><span>Email-ID</span><input id="foremail" type="email" placeholder="Enter your email" name="email" onChange={this.handleChange} required/><div >{this.state.emailmsg}</div></li>
    <li><span>Password</span><input id="forpassword" type="password" placeholder="Enter your password" name="password" onChange={this.handleChange} required/><div >{this.state.passwordmsg}</div></li>
                  <li><input type="checkbox" />Remember Me</li>
                  <li><input type="submit" value="Log In" />
                  
                  <a>Forgot Password</a></li>
                </ul>
                </form>
                <div className="addtnal_acnt">I do not have any account yet.<Link href='#' to="/register">Create My Account Now !</Link></div>
              </div>
            </div>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
              <img src="images/img_9.png" alt="" /> 
            </div>
          </div>
        </div>
        <div className="clear" />
        
      </div>
    );
  }
}