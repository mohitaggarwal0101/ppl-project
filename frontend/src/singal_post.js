import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function Singal_post(props) {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     single: {},
  //     allComments: [],

  //     comment: "",
  //     username: localStorage.username,

  //     like: 0,

  //     allLikes: 0
  //   }

  //   if (localStorage.length === 0) {
  //     this.props.history.push("/login");
  //   }



  // }

  const [single, setSingle] = useState({});
  const [allComments, setAllcomments] = useState([]);
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState(localStorage.username);
  const [like, setLike] = useState(0);
  const [allLikes, setAlllikes] = useState(0);

  // Axios.post("http://localhost:9000/post/singlePost", { id: props.match.params.number }).then((response) => {

  //     // console.log("data of single post +++++++++++++++",response.data[0]);

  //     // this.setState({ single: response.data[0] });

  //     setSingle(response.data[0]);

  //     Axios.post("http://localhost:9000/comment/getComments", { "single": single }).then((response) => {

  //       // this.setState({ allComments: response.data.commentInfo });

  //       setAllcomments(response.data.commentInfo);

  //       Axios.post("http://localhost:9000/comment/getlikes", { file: single.file }).then((response) => {

  //         // console.log("number of likes %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",response.data);

  //         // this.setState({ allLikes: response.data.temp })
  //         setAlllikes(response.data.temp);

  //       })

  //     })

  //   })

  useEffect(() => {
    if (localStorage.length === 0) {
      this.props.history.push("/login");
    }
    
  });

  useEffect(()=>{
    Axios.post("http://localhost:9000/post/singlePost", { id: props.match.params.number }).then((response) => {

      // console.log("data of single post +++++++++++++++",response.data[0]);

      // this.setState({ single: response.data[0] });

      setSingle(response.data[0]);

      console.log("first time mdkmskcmscddddddddddddd",response.data[0]);
      console.log("likes are::::",response.data[0].comments)
      console.log("comments are:::",response.data[0].likes)

      // setAllcomments(response.data[0].comments);
      setAlllikes(response.data[0].likes);

      Axios.post("http://localhost:9000/comment/getComments", { "single": response.data[0] }).then((response) => {

        // this.setState({ allComments: response.data.commentInfo });

        setAllcomments(response.data.commentInfo);

    })
    })

    console.log("link is comming here");
  },[])

  // useEffect(()=>{
  //   Axios.post("http://localhost:9000/comment/getComments", { "single": single }).then((response) => {

  //       // this.setState({ allComments: response.data.commentInfo });

  //       setAllcomments(response.data.commentInfo);

  //   })

  // },[])

  // useEffect(()=>{

  //   console.log("first time mdkmskcmscddddddddddddd",single);

  //   Axios.post("http://localhost:9000/comment/getComments", { "single": single }).then((response) => {

  //       // this.setState({ allComments: response.data.commentInfo });

  //       setAllcomments(response.data.commentInfo);

  //       Axios.post("http://localhost:9000/comment/getlikes", { "file": single.file }).then((response) => {

  //         console.log("number of likes %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",response.data);

  //         // this.setState({ allLikes: response.data.temp })
  //         setAlllikes(response.data.temp);

  //         console.log("likes are getedddddddddddddd");

  //       })

  //     })
  // },[])

  // const handleComment = (event) => {
  //   this.setState({ comment: event.target.value })

  // }

  // componentDidMount() {

  //   Axios.post("http://localhost:9000/post/singlePost", { id: this.props.match.params.number }).then((response) => {

  //     // console.log("data of single post +++++++++++++++",response.data[0]);

  //     this.setState({ single: response.data[0] });

  //     Axios.post("http://localhost:9000/comment/getComments", this.state).then((response) => {

  //       this.setState({ allComments: response.data.commentInfo });

  //       Axios.post("http://localhost:9000/comment/getlikes", { file: this.state.single.file }).then((response) => {

  //         // console.log("number of likes %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",response.data);

  //         this.setState({ allLikes: response.data.temp })

  //       })

  //     })

  //   })

  // }

  const submitComment = (event) => {

    event.preventDefault();

    if (comment.length === 0) {
      console.log("empty comment^^^^^^^^^^^");


    }
    else {
      const state = {
        "single": single,
        "comment": comment,
        "username": username
      }
      Axios.post("http://localhost:9000/comment/addComment", state).then((response) => {

        Axios.post("http://localhost:9000/comment/getComments", { "single": single }).then((response) => {


          // this.setState({ allComments: response.data.commentInfo });

          setAllcomments(response.data.commentInfo);

          // console.log("all comments are #######", this.state.allComments);

          // this.setState({ comment: "" });
          setComment("");

        })

      })
    }

  }

  const handleLikes = (event) => {
    event.preventDefault();

    console.log("clicked on like button...............");

    // console.log("now likes are ^^^^^^in function",this.state.like)

    Axios.post("http://localhost:9000/comment/onlike", { email: localStorage.email, file: single.file }).then((response) => {

      // this.setState({allLikes:response.data.likes})



      console.log("likes to frontend are", response.data);

      Axios.post("http://localhost:9000/comment/getlikes", { "file": single.file }).then((response) => {

        console.log("number of likes in on frontend %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", response.data);

        // this.setState({ allLikes: response.data.temp })

        setAlllikes(response.data.temp);



      })
    })


  }

  return (
    <div>

      <div className="navbar navbar-inverse navbar-fixed-top">
        <div className="navbar-inner">
          <div className="container">
            <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
            <a className="brand" href>PPL</a>
            <div className="pro_info pull-right">
              <div className="pro_icn"><img src="/images/pic_small.png" /></div>
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
                <li className="active"> <a href="#" >Home</a> </li>
                <li className> <a href>E-Coupons</a> </li>
                <li className> <a href>E-Brands</a> </li>
                <li className> <a href>Resuse Market</a> </li>
                <li className> <a href>Lost and Found</a> </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* header */}

      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <a href="#">Upload Post</a> </div>
            <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <a href="#">Invite Friends</a> </div>
            <div className="rght_cate">
              <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
              <div className="rght_list">
                <ul>
                  <li><a href="#"><span className="list_icon"><img src="/images/icon_01.png" alt="up" /></span> CATS</a></li>
                  <li><a href="#"><span className="list_icon"><img src="/images/icon_02.png" alt="up" /></span> Dogs</a></li>
                  <li><a href="#"><span className="list_icon"><img src="/images/icon_03.png" alt="up" /></span> Birds</a></li>
                  <li><a href="#"><span className="list_icon"><img src="/images/icon_04.png" alt="up" /></span> Rabbit</a></li>
                  <li><a href="#"><span className="list_icon"><img src="/images/icon_05.png" alt="up" /></span> Others</a></li>
                </ul>
              </div>
            </div>
            <div className="rght_cate">
              <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
              <div className="sub_dwn">
                <div className="feat_sec">
                  <div className="feat_sec_img"><img src="/images/feat_img1.png" alt="image" /></div>
                  <div className="feat_txt">Lorem Ipusum Text</div>
                </div>
                <div className="feat_sec">
                  <div className="feat_sec_img"><img src="/images/feat_img2.png" alt="image" /></div>
                  <div className="feat_txt">Lorem Ipusum Text</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Dogs</div>
                  </div>
                </div>
                <div className="feat_sec">
                  <div className="feat_sec_img"><img src="/images/feat_img3.png" alt="image" /></div>
                  <div className="feat_txt">Lorem Ipusum Text</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Rabbits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content_lft">
            <div className="contnt_2">
              <div className="div_a">
                <div className="div_title">{single.postname}</div>
                <div className="btm_rgt">
                  <div className="btm_arc">{single.category}</div>
                </div>
                <div className="div_top">
                  <div className="div_top_lft"><img src="/images/img_6.png" />{single.username}</div>
                  <div className="div_top_rgt"><span className="span_date">{single.date}</span><span className="span_time">{single.time}</span></div>
                </div>
                <div className="div_image"><img src={"/posts/" + single.file} alt="pet" /></div>
                <div className="div_btm">
                  <div className="btm_list">
                    <ul>
                      <li><a href="#"><span className="btn_icon"><img src="/images/icon_001.png" alt="share" /></span>Share</a></li>
                      <li><a href="#"><span className="btn_icon"><img src="/images/icon_002.png" alt="share" /></span>Flag</a></li>
                      <li><a onClick={(event)=>handleLikes(event)} href="#"><span className="btn_icon"><img src="/images/icon_003.png" alt="share" /></span>{allLikes} Likes</a></li>
                      <li><a href="#"><span className="btn_icon"><img src="/images/icon_004.png" alt="share" /></span>{allComments.length} Comments</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="contnt_3">
              <ul>
                {
                  allComments.map((item) => {
                    return (<li>
                      <div className="list_image">
                        <div className="image_sec"><img src="/images/post_img.png" /></div>
                        <div className="image_name">{item.usernames}</div>
                      </div>
                      <div className="list_info">
                        {item.comments}
                      </div>
                      <input type="button" defaultValue="Reply" className="orng_btn" />
                    </li>)
                  })
                }



                <li>
                  <div className="cmnt_div1">
                    <input type="text" value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Enter a comment" id="abc" className="cmnt_bx1" />
                    <input type="submit" className="sub_bttn1" onClick={(event)=>submitComment(event)} defaultValue="Submit Comment" />
                  </div>
                </li>
              </ul>
              <div className="view_div"><a href="#">View more</a></div>
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>

    </div>
  );

}