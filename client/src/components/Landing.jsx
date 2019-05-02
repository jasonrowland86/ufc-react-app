import React from 'react';
import { Link } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
  }

  render() {
    return(
      <Router>
        <div className="landing">
          <h2>Landing</h2>
          <Link to="/" user={this.state.user} onClick={this.props.changePage}>Main Site</Link>
        </div>
      </Router>
    )
  }
}

export default Landing;
