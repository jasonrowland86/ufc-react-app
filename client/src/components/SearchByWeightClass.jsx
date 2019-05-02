import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class SearchByWeightClass extends React.Component {
  constructor() {
    super();
    this.state = {
      fireRedirect: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.getFighters();
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    }, () => {
      this.getFightersByWeightClass(this.state.weight_class);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/fighters', {
      fighter1: this.state.fighter1,
      fighter2: this.state.fighter2
    })
    .then((res) => {
      if (res.data === "Fighter not found") {
        this.setState({
          areFighters: false,
          fireRedirect: true
        })
      } else {
        this.setState({
          areFighters: true,
          fighter1: res.data.fighter1[0].first_name + ' ' + res.data.fighter1[0].last_name,
          fighter2: res.data.fighter2[0].first_name + ' ' + res.data.fighter2[0].last_name,
          fireRedirect: true
        })
      }
    });
  }

  getFighters() {
    axios.get(`/fighters`)
    .then(res => {
      let fighters = res.data.map(d => {
          return d.first_name + " " + d.last_name;
        })
      fighters = fighters.sort();
      fighters = fighters.map(f => {
        if (!f.startsWith(".")) {
          return f
        }
      })
      this.setState({
        fighters: res.data,
        fighter_names: fighters,
      })
    })
  }

  getFightersByWeightClass(weight_class) {
    if (weight_class.includes(" ")) {
      weight_class = weight_class.replace(" ", "_");
    }
    if (this.state.fighters) {
      let fighters = this.state.fighters.filter(f => f.weight_class === weight_class);
      fighters = fighters.map(f => {
        return f.first_name + " " + f.last_name;
      })
      fighters = fighters.sort();
      fighters = fighters.map(f => {
        if (!f.startsWith(".")) {
          return f
        }
      })
      this.setState({
        names_by_class: fighters
      })
    }
  }

  render() {
    let fighters;
    let all_weight_classes = [
      "Women Bantamweight",
      "Heavyweight",
      "Light Heavyweight",
      "Middleweight",
      "Welterweight",
      "Lightweight",
      "Bantamweight",
      "Featherweight",
      "Flyweight"
    ];
    let weight_classes = all_weight_classes.map(w => {
      return <option key={w} value={w}>{w}</option>
    })
    weight_classes.unshift(<option key="" value="" disabled selected>Select Weight Class</option>);

    if (this.state.fighters) {
      if (this.state.names_by_class) {
        fighters = this.state.names_by_class.map(n => {
          return <option key={n} value={n}>{n}</option>
        })
        fighters.unshift(<option key="" value="" disabled selected>Select Fighter</option>);
      }
    }
    return(
      <div className="main-content">
        <br />
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="select-container">
            <select name="weight_class"  onChange={this.handleInputChange}>
              {weight_classes}
            </select>
          </div>
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
          <Redirect to={{pathname: '/fighters', state: {areFighters: this.state.areFighters, fighter1: this.state.fighter1, fighter2: this.state.fighter2} }} />
        }
      </div>
    )
  }
}

export default SearchByWeightClass;
