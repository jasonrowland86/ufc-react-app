import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Nav extends React.Component {
  constructor() {
    super();
    this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.handleUser(null);
    this.setState({
      user: null
    })
    console.log("log out");
    axios.get('/logout')
    .then(res => {
      this.props.handleUser(null);
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    console.log(this.state);
    return(
      <div className="nav">
        <h3>Nav</h3>
        {this.props.user ?
          <div className="nav-links">
            <div className="nav-left">
              <Link className="link" to="">{this.props.user.name}</Link>
            </div>
            <div className="nav-right">
              <Link className="link" to="" onClick={this.handleLogout}>Logout</Link>
              <Link className="link" to="/">Search</Link>
              <Link className="link" to="/dashboard">Dashboard</Link>
            </div>
          </div>
          :
          <div className="nav-links">
            <div className="nav-left"></div>
            <div className="nav-right">
              <Link className="link" to="/login">Login</Link>
              <Link className="link" to="/" >Search</Link>
            </div>
          </div>
          }
      </div>
    )
  }
}

export default Nav;
