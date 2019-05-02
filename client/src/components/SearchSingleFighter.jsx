import React from 'react';
import { Redirect } from 'react-router-dom';

class SearchSingleFighter extends React.Component {
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
    this.setState({
      fireRedirect: true
    })
  }

  render() {
    let fighters;
    //Use count for unique key because fighters with the same name exist
    let count = 0;
    if (this.props.fighters) {
      fighters = this.props.fighters.map(f => {
        if (f) {
          return <option key={count++} value={f}>{f}</option>
        }
      })
      fighters.unshift(<option key="" value="" disabled selected>Select Fighter</option>);
    }
    return(
      <div className="main-content">
        <br />
        <div>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className="inner-searchform">
              <div>
                <input list="fighters" type="text" name="fighter" placeholder="Enter Fighter Name" value={this.state.name} onChange={this.handleInputChange} />
                <datalist id="fighters">
                  {fighters}
                </datalist>
              </div>
            </div>
            <br />
            <input type="submit" value="Search" />
          </form>
          {this.state.fireRedirect &&
            <Redirect to={{pathname: '/fighter', state: {fighterName: this.state.fighter} }} />
          }
        </div>
      </div>
    )
  }
}

export default SearchSingleFighter;
