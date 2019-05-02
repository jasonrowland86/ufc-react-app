import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Header from './Header';
import Nav from './Nav';
import MainSearch from './MainSearch';
import UserDash from './UserDash';
import SingleFighter from './SingleFighter';
import CompareFighters from './CompareFighters';
import Login from './Login';
import Register from './Register';
import EventCard from './EventCard';
import Info from './Info';
import Banner from './Banner';
import FighterIndex from './FighterIndex';
import Footer from './Footer';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      mainSearch: true,
      user: null
    }
  }

  componentDidMount() {

  }

  handleUser(user) {
    this.setState({user: user});
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

export default Main;
