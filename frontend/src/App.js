import React, { Component } from 'react';
import './App.css';
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";

import Nav from './components/Navbar';
import DiaryList from './pages/DiaryList';
import DiaryDetail from './pages/DiaryDetail';
import LandingPage from './pages/LandingPage';

import "./styles/base.css"

class App extends Component {

  render() { 
    return ( 
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={LandingPage}/>
          <Route path="/diaries" exact component={DiaryList}/>
        </Switch>
      </Router>
     );
  }
}
 
export default App;
