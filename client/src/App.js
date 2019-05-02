import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import Nav from './components/Nav';
import MainSearch from './components/MainSearch';
import UserDash from './components/UserDash';
import SingleFighter from './components/SingleFighter';
import CompareFighters from './components/CompareFighters';
import Login from './components/Login';
import Register from './components/Register';
import EventCard from './components/EventCard';
import Info from './components/Info';
import Banner from './components/Banner';
import FighterIndex from './components/FighterIndex';
import Footer from './components/Footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      nav: {
        display: "none"
      }
    }
    this.handleLogout.bind(this);
  }

  handleLanding() {
    console.log("clicked!");
    this.setState({
      landingLogo: {
        display: "none"
      },
      nav: {
        display: "block",
        display: 'flex',
        flexDirection: 'column'
      }
    });
    this.handleDropDown();
  }

  hndleLanding() {

  }

  handleDropDown() {
    console.log("handleDropDown");
    if(this.state.dropDownMenu) {
      this.setState({
        dropDown: {
          transition: '.5s cubic-bezier(0.25,0.1,0.25,1)',
          transform: 'translateY(0%)',
          zIndex: '0'
        },
        dropDownMenu: false
      })
    } else {
      this.setState({
        dropDown: {
          transition: '.5s cubic-bezier(0.25,0.1,0.25,1)',
          transform: 'translateY(-90%)',
          // zIndex: '-1',
        },
        dropDownMenu: true
      })
    }
  }

  handleUser(user) {
    this.setState({user: user});
  }

  handleLogout() {
    this.setState({
      user: null
    })
    console.log("log out");
    axios.get('/logout')
    .then(res => {
      this.handleUser(null);
    }).catch(err => {
      console.log(err);
    });
  }

  // <Route exact path="/fighters" render={() => <CompareFighters user={this.state.user} />} />

  // <Route exact path="/fighters" component={CompareFighters} />

  // <Route exact path="/event/:id" component={EventCard} />

  // <Route exact path="/event/:id" render={() => <EventCard user={this.state.user} />} />

  // <Nav handleUser={this.handleUser.bind(this)} user={this.state.user} />

  render() {
    console.log(this.state);
    return(
      <Router>
        <div className="main">
          <div className="landing" style={this.state.dropDown}>
            <div className="landing-main">
              <div style={this.state.landingLogo}>
                <Link className="link" to=""><div><p>UFC</p><p>Fight Picks</p></div></Link>
                <Link className="link" to="/login" onClick={this.handleLanding.bind(this)}>Login</Link>
              </div>
              {this.state.user ?
                <div className="nav-links" style={this.state.nav}>
                  <Link className="link" to="/" onClick={this.handleLanding.bind(this)}>Search</Link>
                  <Link className="link" to="/dashboard" onClick={this.handleLanding.bind(this)}>Dashboard</Link>
                  <Link className="link" to="" onClick={this.handleLogout}>Logout</Link>
                </div>
                :
                <div className="nav-links" style={this.state.nav}>
                  <Link className="link" to="/" onClick={this.handleLanding.bind(this)}>Search</Link>
                  <Link className="link" to="/login" onClick={this.handleLanding.bind(this)}>Login</Link>
                </div>
              }
            </div>
            <div className="menu-button-container">
              <div className="menu-button" onClick={this.handleLanding.bind(this)} to="">X</div>
            </div>
          </div>
          <Header />
          <Banner />
          <Info user={this.state.user} />
          <Route exact path="/" component={MainSearch} />
          <Route exact path="/dashboard" render={() => <UserDash user={this.state.user} />} />
          <Route exact path="/login" render={() => <Login handleUser={this.handleUser.bind(this)} />} />
          <Route exact path="/register" render={() => <Register handleUser={this.handleUser.bind(this)} />} />
          <Route exact path="/fighter" component={SingleFighter} />
          <Route exact path="/fighters" component={CompareFighters} />
          <Route exact path="/event/:id" component={EventCard} />
          <Route exact path="/allfighters" component={FighterIndex} />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
