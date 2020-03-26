import React from 'react';
import {Switch , Route, Router} from 'react-router-dom';
import Timeline from './timeline';
import Login from './login';
import Register from './register';
import Singal_post from './singal_post';
import Header from './header.js';
import Footer from './footer';

const Main=()=>(

  <div>
    <Route path="/" component={Header} />
  <Switch>
      <Route exact path="/" component={Login} />
       <Route path="/register" component={Register} />
       <Route path="/login" component={Login} />
      <Route path="/timeline" component={Timeline} />
      <Route exact path="/singal_post" component={Login} /> 
      <Route path="/singal_post/:number" component={Singal_post} />
      
  </Switch>
    <Route path="/" component={Footer} />
  </div>
)

export default Main;