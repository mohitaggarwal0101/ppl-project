import React from 'react';

export default function Header (props){
    // constructor(props){
    //     super(props);

    // }

    const handleLogout=(event)=>{

      event.preventDefault();

        if(localStorage.length != 0)
        {
            localStorage.clear();
    
            props.history.push('/login');
        }
    }

        return(
            <div className="header">
          <div className="header_lft">
            <div className="logo"><a href="#"><img src="/images/logo.png" /></a></div>
           {(localStorage.length !=0) &&  <div className="navigatn">
              <ul>
                <li><a href="#" className="active" onClick={() => props.history.push('/timeline')}>Home</a></li>
                <li><a href="#" onClick={(event)=>handleLogout(event)}> Log out </a></li>
              </ul>
            </div>}
          </div>
          {(localStorage.length != 0) && <div className="header_rgt">
            <div className="flag_div"><img src="/images/flag.png" /></div>
            <input type="text" placeholder="Search" className="txt_box" />
            <div className="msg_box"><a href="#"><span className="msg_count">100</span></a></div>
            <div className="info_div">
              <div className="image_div"> <img src="/images/pic.png" /> </div>
              <div className="info_div1">Me</div>
            </div>
          </div> }
        </div>
        )
    
}