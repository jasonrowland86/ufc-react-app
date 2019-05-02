import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class PoundForPound extends React.Component {
  constructor() {
    super();
    this.state = {
      fighters: null,
      loading: true
    }
  }

  componentDidMount() {
    this.getFighters();
  }

  getFighters() {
    this.setState({ loading: true })
    axios.get(`/fighters`)
    .then(res => {
      this.setState({
        fighters: res.data,
        loading: false
      })
    })
  }

  handleLoading() {
    if (this.state.loading) {
      return <div className="loading"></div>
    }
  }

  render() {
    let p4p;
    // Filter fighters by title holders
    if (this.state.fighters) {
      p4p = this.state.fighters.filter(f => f.pound_for_pound_rank);
      // Get a list of the rankings numerically
      let ranks = p4p.map(p => {
        return p.pound_for_pound_rank
      })
      // Convert rank string value to integer
      for (let i = 0; i < ranks.length; i++) {
        ranks[i] = Number(ranks[i]);
      }
      // Sort rankings for comaprison
      ranks = ranks.sort((a, b) => a - b);
      // Fix duplicates
      for (let i = 0; i < ranks.length; i++) {
        if (ranks[i] === ranks[i-1]) {
          ranks[i] = ranks[i] + 1;
        }
      }
      // Turn integers back to string for comparison
      for (let i = 0; i < ranks.length; i++) {
        ranks[i] = ranks[i].toString();
      }
      // Order p4p fighters by rankings order
      let sorted = [];
      for (let i = 0; i < ranks.length; i++) {
        for (let y = 0; y < p4p.length; y++) {
          if (p4p[y].pound_for_pound_rank === ranks[i]) {
            sorted.push(p4p[y]);
          }
        }
      }
      // Use count to list rankings
      let count = 1;
      let key = 0;
      p4p = sorted.map(s => {
        return <div key={key++} className="list-item">
          <Link className="link" to={{pathname: "/fighter", state: {fighter: s} }}><p>{count++ + ". " + s.first_name + " " + s.last_name}</p></Link>
        </div>
      })
    }
    return(
      <div className="info-item">
        <h3>Pound For Pound Rankings</h3>
          <div className="info-list info-side-list">
            <div className="p4p">
              {p4p}
            </div>
            {this.handleLoading()}
          </div>
      </div>
    )
  }
}

export default PoundForPound;
