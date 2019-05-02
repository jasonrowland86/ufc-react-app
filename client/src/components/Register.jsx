import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
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

  registerSubmit(e) {
    e.preventDefault();
    axios.post('/register', {
      username: this.state.username,
      password: this.state.password
    })
    .then(res => {
      this.setState({
        user: res.data.user,
        fireRedirect: true
      })
      this.props.handleUser(res.data.user);
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return(
      <div className="main-content">
        <h3>Create Account</h3>
        <form onSubmit={(e) => this.registerSubmit(e)}>
          <input type='text' name='username' value={this.state.username} placeholder='Username' onChange={this.handleInputChange} />
          <input type='text' name='password' value={this.state.password} placeholder='Password' onChange={this.handleInputChange} />
          <input className='button' type='submit' value='Create' />
        </form>
        <br/>
        <Link className="link" to="/login">Log in</Link>
        {this.state.fireRedirect &&
          <Redirect to={{pathname: '/dashboard', state: {user: this.state.user} }} />
        }
      </div>
    )
  }
}

export default Register;
