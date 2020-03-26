import React from 'react';
import Upload from './upload_post';
import pics from './posts/rsz_4.png';
import Axios from 'axios';
// import throttle from 'lodash.throttle';
import {Link, Redirect} from 'react-router-dom';

export default class Timeline extends React.Component{
  constructor(props){
    super(props);
    console.log("timeline",props)
    this.state={
      temp:false,
      email:localStorage.email,
      username:localStorage.username,
      posts:[],
      addcat:false,

      tempcat:"",
      thumbnail:"",
      diff:"",
      forclass:true,
      editName:false,


      allCategories:[]
    }

    
    console.log("data going to backend____>>>>>",this.state);

    Axios.post("http://localhost:9000/post/allPosts", this.state).then((response) =>{

      console.log("database data +++++++++++++++",response.data);

      this.setState({posts:response.data});


    console.log("posts areeeeeeeeeeeee########",this.state.posts);
    

    })

    Axios.post("http://localhost:9000/category/getCategories", this.state).then((response) =>{

      // console.log("database data +++++++++++++++",response.data);

      this.setState({allCategories:response.data});


    // console.log("posts areeeeeeeeeeeee########",this.state.posts);
    

    })

  }

  handleClass=()=>{
    
  }
  

  handleChange = () =>{
    // this.props.change();
    
    if(this.state.allCategories.length != 0)
    this.setState({temp:true})
  }

  handleTempCat = (event)=>{
    this.setState({tempcat:event.target.value});

  }

  handlethumbnail=(event)=>{

    console.log("snncsnnsknksdnsd@@@@@@",event.target.files[0]);

    this.setState({thumbnail:event.target.files[0]})

     console.log("thumbnail issssssssssss",this.state.thumbnail);

  }

  myallposts=()=>{

    if(this.state.forclass === true)
    {
      this.setState({forclass:false})
    }
    else
    {
      this.setState({forclass:true})
    }

    Axios.post("http://localhost:9000/post/myPosts", this.state).then((response) =>{

      console.log("database data +++++++++++++++",response.data);

      this.setState({posts:response.data});


    console.log("posts areeeeeeeeeeeee########",this.state.posts);
    

    })
  }

  allposts=()=>{

    if(this.state.forclass === true)
    {
      this.setState({forclass:false})
    }
    else
    {
      this.setState({forclass:true})
    }

    Axios.post("http://localhost:9000/post/allPosts", this.state).then((response) =>{

      console.log("database data +++++++++++++++",response.data);

      this.setState({posts:response.data});


    console.log("posts areeeeeeeeeeeee########",this.state.posts);
    

    })
  }

  handlePostsOldestFirst=(event)=>{

    event.preventDefault();

    Axios.post("http://localhost:9000/post/allPosts", this.state).then((response) =>{

      // console.log("database data +++++++++++++++",response.data);

      this.setState({posts:response.data});

    // console.log("posts areeeeeeeeeeeee########",this.state.posts);
    

    })
  }

  handlePostsLatestFirst=(event)=>{

    event.preventDefault();

    Axios.post("http://localhost:9000/post/allPosts", this.state).then((response) =>{

      // console.log("database data +++++++++++++++",response.data);

      this.setState({posts:response.data.reverse()});
      
    // console.log("posts areeeeeeeeeeeee########",this.state.posts);
    

    })
  }

  handlePostsMostLiked=(event)=>{

    event.preventDefault();

    Axios.post("http://localhost:9000/post/allPosts", this.state).then((response) =>{

      // console.log("database data +++++++++++++++",response.data);

      this.setState({posts:response.data.sort(function(a, b){return a.likes - b.likes}).reverse()});
      
    // console.log("posts areeeeeeeeeeeee########",this.state.posts);
    
    })
  }

  handlePostsMostCommented=(event)=>{

    event.preventDefault();

    Axios.post("http://localhost:9000/post/allPosts", this.state).then((response) =>{

      // console.log("database data +++++++++++++++",response.data);

      this.setState({posts:response.data.sort(function(a, b){return a.comments - b.comments}).reverse()});
      
    // console.log("posts areeeeeeeeeeeee########",this.state.posts);
    
    })
  }

  addCat = (event) =>{

    event.preventDefault();

         const formData =  new FormData();
         formData.append("category",this.state.tempcat)
         formData.append("thumbnail",this.state.thumbnail)
         
            const config = {
                headers:{
                    "content-type": "multipart/form-data"
                }
            }

         Axios.post("http://localhost:9000/category/addCategories", formData,config).then((response) =>{
    
           console.log("upload response++++++++!!!!!",response.data);

           this.setState({allCategories:response.data});

           console.log("list Is----------",this.state.allCategories);
    
         })

            
    this.setState({addcat:false});     

  }

  diffcat = (e) =>{

    //  event.preventDefault();

    console.log("mmmcdk",e)

  
    



    Axios.post("http://localhost:9000/post/diffPosts", {cat:e,email:localStorage.email}).then((response) =>{

      // console.log("database data +++++++++++++++",response.data);

      this.setState({posts:response.data});


    // console.log("posts areeeeeeeeeeeee########",this.state.posts);
    

    })

  }

  handleCat=()=>{
    if(this.state.addcat === false)
    {
      this.setState({addcat:true});
    }
    // else
    // {
    //   this.setState({addcat:false});
    // }
  }

  handleUsername =(event)=>{
    event.preventDefault();

    console.log("clicked on edit button");

    if(this.state.editName === false)
    {
      this.setState({editName:true});
    }
    else
    {
      this.setState({editName:false});
    }
  }

  handleChangeName=(event)=>{
    event.preventDefault();

    console.log(event.target.value);

    this.setState({username:event.target.value});
  }

  nameChanged=(event)=>{
    event.preventDefault();
    
    console.log("name changed successfully ie ",this.state.username);

    Axios.post("http://localhost:9000/user/changeUsername",{email:localStorage.email,username:this.state.username}).then((response)=>{

      localStorage.setItem('username',response.data.username);

      console.log("changes name is :::::::::",response.data);

      Axios.post("http://localhost:9000/post/allPosts", this.state).then((response) =>{

      // console.log("database data +++++++++++++++",response.data);

      this.setState({posts:response.data});

    // console.log("posts areeeeeeeeeeeee########",this.state.posts);
    

    })

      this.setState({editName:false});

    })

    

  }
  render(){

    if(localStorage.length === 0)
    {
      this.props.history.push("/login");
    }

    return (
      <div>
        <div className="navbar navbar-inverse navbar-fixed-top">
          <div className="navbar-inner">
            <div className="container">
              <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
              <a className="brand" href>PPL</a>
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
                  <li className="active"> <a href>Home</a> </li>
                  <li className> <a href>E-Coupons</a> </li>
                  <li className> <a href>E-Brands</a> </li>
                  <li className> <a href>Resuse Market</a> </li>
                  <li className> <a href>Lost and Found</a> </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="header">
          <div className="header_lft">
            <div className="logo"><a href="#"><img src="images/logo.png" /></a></div>
            <div className="navigatn">
              <ul>
                <li><a href="#" className="active">Home</a></li>
                
                <li><a href="#" onClick={this.handleLogout} >log Out</a></li>
              </ul>
            </div>
          </div>
          <div className="header_rgt">
            <div className="flag_div"><img src="images/flag.png" /></div>
            <input type="text" placeholder="Search" className="txt_box" />
            <div className="msg_box"><a href="#"><span className="msg_count">100</span></a></div>
            <div className="info_div">
              <div className="image_div"> <img src="images/pic.png" /> </div>
              <div className="info_div1">Me</div>
            </div>
          </div>
        </div> */}
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a href="#" onClick={this.handleChange}>Upload Post</a> </div>
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a href="#" onClick={this.handleCat}>Add Category</a> </div>
              <div className="rght_cate">
                <div className="rght_btn">
                {this.state.addcat === true && 
              <div>
                <form onSubmit={this.addCat}>

                    Thumbnail:<br/>
                    <input type="file" name="thumbnail" onChange={this.handlethumbnail} required/><br/><br/>

                    Name:<br/>
                    <input type="text" name="category" onChange={this.handleTempCat} required/><br/><br/>

                    <input type="submit" value="add to the list"/>
                </form>
            </div>} 
              </div>

              {/* <div>
                mdcmsxdcmcd
                <ul>
                {
                      this.state.categories.map((item)=>{
                        return(<li><a href="#"><span className="list_icon"><img src="images/icon_01.png" alt="up" /></span> {item}</a></li>)
                      })
                    }
                    </ul>
              </div> */}


              


                <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                <div className="rght_list">
                  <ul>
                    {/* <li><a href="#"><span className="list_icon"><img src="images/icon_01.png" alt="up" /></span> CATS</a></li>
                    <li><a href="#"><span className="list_icon"><img src="images/icon_02.png" alt="up" /></span> Dogs</a></li>
                    <li><a href="#"><span className="list_icon"><img src="images/icon_03.png" alt="up" /></span> Birds</a></li>
                    <li><a href="#"><span className="list_icon"><img src="images/icon_04.png" alt="up" /></span> Rabbit</a></li>
                    <li><a href="#"><span className="list_icon"><img src="images/icon_05.png" alt="up" /></span> Others</a></li> */}

                    {
                      this.state.allCategories.map((item)=>{
                        return(<li ><a value={item.category} onClick={()=>this.diffcat(item.category)} href="#"><span className="list_icon"><img style={{width:"40px",height:"30px"}}  src={"posts/" + item.thumbnail} alt="up" /></span> {item.category}</a></li>)
                      })
                    }
                  </ul>
                </div>
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
                <div className="sub_dwn">
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="images/feat_img1.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="images/feat_img2.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Dogs</div>
                    </div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="images/feat_img3.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Rabbits</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content_lft">
              <div className="contnt_1">
                <div className="list_1">
                  <ul>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Friends</li>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Flaged</li>
                  </ul>
                </div>
                
                <div className="timeline_div">
                  <div className="timeline_div1">
                    <div className="profile_pic">
                      <img src="images/lft_img1.png" style={{width:"300px",height:"200px"}} />
                      <div className="profile_text"><a href="#">Change Profile Pic</a></div>
                    </div>
                    <div className="profile_info">
                      <div className="edit_div"><a href="#" onClick={this.handleUsername}>Edit <img src="images/timeline_img.png" /></a></div>
                      <div className="profile_form">
                        <ul>
                          <li>
                            <div className="div_name1">Name :</div>
                            <div className="div_name2">{localStorage.username}</div>
                          </li>
                          <li>
                            <div className="div_name1">Sex :</div>
                            <div className="div_name2">male</div>
                          </li>
                          <li>
                            <div className="div_name1">Description :</div>
                            <div className="div_name3">This is an example of a comment. You can create as many comments like this one
                              or sub comments as you like and manage all of your content inside Account.</div>
                          </li>
                          {(this.state.editName === true) && <div>
                            <h3>Change your Username:</h3>
                            enter new name:
                            <form onSubmit={this.nameChanged}>
                              <input type="text" onChange={this.handleChangeName}/>
                              <input type="submit" value="Change"/>
                            </form>
                          </div>}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="timeline_div2">
                    <ul>
                      <li><a href="#"  className={this.state.forclass === true ? "active" : ""} onClick={ this.handleClass , this.allposts }>Timeline    </a></li>
                      <li><a href="#">About  </a></li>
                      <li><a href="#">Album</a></li>
                      <li><a href="#"> Pets</a></li>
                      <li><a href="#" className={this.state.forclass === false ? "active" : ""} onClick={ this.handleClass , this.myallposts}>My Uploads </a></li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="post_div">
                  <div className="post_list">
                    <ul>
                      <li><a href="#" onClick={this.handlePostsLatestFirst}><span className="list_img"><img src="images/img_1.png" /></span>Latest First</a></li>
                      <li><a href="#" onClick={this.handlePostsOldestFirst}><span className="list_img"><img src="images/img_2.png" /></span>Oldest First</a></li>
                      <li><a href="#" onClick={this.handlePostsMostLiked}><span className="list_img"><img src="images/img_4.png" /></span>Most Liked</a></li>
                      <li><a href="#" onClick={this.handlePostsMostCommented}><span className="list_img"><img src="images/img_5.png" /></span>Most Commented</a></li>
                    </ul>
                  </div>
              </div>

              {this.state.temp === true && <Upload AllCategories={this.state.allCategories}/>}
             

              <ul>

              {
                
                this.state.posts.map(function(num){
                  return (
                    <li >
                  <div className="contnt_2"  >
                  <div className="div_a">
                <div className="div_title">{num.postname}</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">{num.category}</div>
                    </div>
                    <div className="div_top">
                <div className="div_top_lft"><img src="images/img_6.png" />{num.username}</div>
                <div className="div_top_rgt"><span className="span_date">{num.date}</span><span className="span_time">{num.time}</span></div>
                    </div>
                    <Link to={`/singal_post/${num._id}`}>
                    <div className="div_image"><img src={"posts/" + num.file} alt="pet" /></div>
                    <div className="div_btm">
                      <div className="btm_list">
                        <ul>
                          <li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                          <li><a href="#"><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                          <li><a href="#"><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>{num.likes} Likes</a></li>
                          <li><a href="#"><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>{num.comments} Comments</a></li>
                        </ul>
                      </div>
                    </div>
                    </Link>
                  </div>
                </div>
                </li>
                )
                })
                
              }
              </ul>

              



              {/* <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">User Interface PSD Source files Web Designing for web</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Cats</div>
                  </div>
                  <div className="div_top">
                    <div className="div_top_lft"><img src="images/img_6.png" />Steave Waugh</div>
                    <div className="div_top_rgt"><span className="span_date">02 Jan 2014</span><span className="span_time">11:15am</span></div>
                  </div>
                  <div className="div_image"><img src={"images/" + "lft_img.png"} alt="pet" /></div>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>0 Likes</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>4 Comments</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">User Interface PSD Source files Web Designing for web</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Dogs</div>
                  </div>
                  <div className="div_top">
                    <div className="div_top_lft"><img src="images/img_6.png" />Steave Waugh</div>
                    <div className="div_top_rgt"><span className="span_date">02 Jan 2014</span><span className="span_time">11:15am</span></div>
                  </div>
                  <div className="div_image"><img src="images/lft_img1.png" alt="pet" /></div>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>0 Likes</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>4 Comments</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="clear" />
        </div>
        
        {/* footer */}

      </div>
    );
  }
}