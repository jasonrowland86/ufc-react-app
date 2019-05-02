import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      fireRedirect: false,
      loading: false,
      showLoading: {display: "none"},
      showForm: {display: "block"}
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
    this.handleShowLoading();
    e.preventDefault();
    axios.post('/fighters', {
      fighter1: this.state.fighter1,
      fighter2: this.state.fighter2
    })
    .then((res) => {
      this.setState({
        fireRedirect: true
      })
    });
  }

  handleShowLoading() {
    this.setState({
      showLoading: {display: "block"},
      showForm: {display: "none"}
    })
  }

  render() {
    let fighters;
    //For unique key because fighters with the same name exist
    let count = 0;
    if (this.props.fighters) {
      fighters = this.props.fighters.map(f => {
        if (f !== undefined) {
          return <option key={count++} value={f}>{f}</option>
        }
      })
    }
    return(
      <div className="main-content">
        <div className="loading" style={this.state.showLoading}></div>
        <div style={this.state.showForm}>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className="inner-searchform">
              <div>
                <input list="fighters" type="text" name="fighter1" placeholder="Enter Fighter Name" value={this.state.name} onChange={this.handleInputChange} />
                <datalist id="fighters">
                  {fighters}
                </datalist>
              </div>
              <h2>vs</h2>
              <div>
                <input list="fighters" type="text" name="fighter2" placeholder="Enter Fighter Name" value={this.state.name} onChange={this.handleInputChange} />
                  <datalist id="fighters">
                    {fighters}
                  </datalist>
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

export default Search;
