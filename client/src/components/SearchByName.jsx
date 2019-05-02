import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class SearchByName extends React.Component {
  constructor() {
    super();
    this.state = {
      fireRedirect: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/fighters', {
      fighter1: this.state.fighter1,
      fighter2: this.state.fighter2
    })
    .then((res) => {
      this.setState({
        fighter1: res.data.fighter1[0].first_name + ' ' + res.data.fighter1[0].last_name,
        fighter2: res.data.fighter2[0].first_name + ' ' + res.data.fighter2[0].last_name,
        fireRedirect: true
      })
    });
  }

  render() {
    let fighters;
    let count = 0;
    if (this.props.fighters) {
      fighters = this.props.fighters.map(f => {
        if (f) {
          return <option key={count++} value={f}>{f}</option>
        }
      })
      fighters.unshift(<option value="" key=" " disabled selected>Select Fighter</option>);
    }
    return(
      <div className="main-content">
        <div>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className="inner-searchform">
              <div>
                <select name="fighter1"  onChange={this.handleInputChange}>
                  {fighters}
                </select>
              </div>
              <h2>vs</h2>
              <div>
                <select name="fighter2"  onChange={this.handleInputChange}>
                  {fighters}
                </select>
              </div>
            </div>
            <input type="submit" value="Search" />
          </form>
          {this.state.fireRedirect &&
            <Redirect to={{pathname: '/fighters', state: {fighter1: this.state.fighter1, fighter2: this.state.fighter2} }} />
          }
        </div>
      </div>
    )
  }
}

export default SearchByName;
