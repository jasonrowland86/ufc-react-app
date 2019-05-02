import React from 'react';
import Search from './Search';
import SearchByName from './SearchByName';
import SearchByWeightClass from './SearchByWeightClass';
import SearchSingleFighter from './SearchSingleFighter';
import axios from 'axios';

class MainSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      showAll: {
        display: 'block'
      },
      showName: {
        display: 'none'
      },
      showClass: {
        display: 'none'
      },
      showSingle: {
        display: 'none'
      }
    }
  }

  componentDidMount() {
    this.getFighters();
  }

  handleSearchType(e) {
    if (e.target.value === "All") {
      this.setState({
        showAll: {
          display: 'block'
        },
        showName: {
          display: 'none'
        },
        showClass: {
          display: 'none'
        },
        showSingle: {
          display: 'none'
        }
      })
    } else if (e.target.value === "Name") {
      this.setState({
        showAll: {
          display: 'none'
        },
        showName: {
          display: 'block'
        },
        showClass: {
          display: 'none'
        },
        showSingle: {
          display: 'none'
        }
      })
    } else if (e.target.value === "Class") {
      this.setState({
        showAll: {
          display: 'none'
        },
        showName: {
          display: 'none'
        },
        showClass: {
          display: 'block'
        },
        showSingle: {
          display: 'none'
        }
      })
    } else if (e.target.value === "Single") {
      this.setState({
        showAll: {
          display: 'none'
        },
        showName: {
          display: 'none'
        },
        showClass: {
          display: 'none'
        },
        showSingle: {
          display: 'block'
        }
      })
    }
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
        fighter_names: fighters
      })
    })
  }

  render() {
    return(
      <div className="main-content">
        <br/>
        <h3>Search</h3>
        <div className="search-options">
          <button value="All" onClick={(e) => this.handleSearchType(e)} >All</button>
          <button value="Name" onClick={(e) => this.handleSearchType(e)} >By Name</button>
          <button value="Class" onClick={(e) => this.handleSearchType(e)} >By Weight Class</button>
          <button value="Single" onClick={(e) => this.handleSearchType(e)} >Single Fighter</button>
        </div>
        <div style={this.state.showAll} >
          <Search fighters={this.state.fighter_names}/>
        </div>
        <div style={this.state.showName} >
          <SearchByName fighters={this.state.fighter_names}/>
        </div>
        <div style={this.state.showClass} >
          <SearchByWeightClass fighters={this.state.fighter_names} data={this.state.fighters}/>
        </div>
        <div style={this.state.showSingle} >
          <SearchSingleFighter fighters={this.state.fighter_names} data={this.state.fighters}/>
        </div>
      </div>
    )
  }
}

export default MainSearch;
