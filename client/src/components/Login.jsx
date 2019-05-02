import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      user: null,
      fireRedirect: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        })
    }

  loginSubmit(e) {
    e.preventDefault();
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password
    })
    .then(res => {
      this.props.handleUser(res.data.user);
      this.setState({
        user: res.data.user,
        fireRedirect: true
      })
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return(
      <div className="main-content">
        <h3>Login</h3>
        <form onSubmit={(e) => this.loginSubmit(e)}>
          <input type='text' name='username' value={this.state.username} placeholder='Username' onChange={this.handleInputChange} />
          <input type='password' name='password' value={this.state.password} placeholder='Password' onChange={this.handleInputChange} />
          <input className='button' type='submit' value='Log in' />
        </form>
        <br/>
        <Link className="link" to="/register">Create Account</Link>
        {this.state.fireRedirect &&
          <Redirect to={{pathname: '/dashboard', state: {user: this.state.user} }} />
        }
      </div>
    )
  }
}

export default Login;
