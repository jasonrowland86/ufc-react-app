import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SingleFighter extends React.Component {
  constructor() {
    super();
    this.state = {
      fighter: null,
      loading: true,
      sherdogData: null
    }
  }

  componentDidMount() {
    if (this.props.history.location.state.opponent) {
        this.getFighter(this.props.history.location.state.opponent);
        this.getFighterFromSherdog(this.props.history.location.state.opponent);
    } else if (this.props.history.location.state.fighter) {
        this.getFighter(this.props.history.location.state.fighter);
        this.getFighterFromSherdog(this.props.history.location.state.fighter.first_name + "-" + this.props.history.location.state.fighter.last_name);
    } else if (this.props.history.location.state.fighterName) {
        this.getFighter(this.props.history.location.state.fighterName);
        this.getFighterFromSherdog(this.props.history.location.state.fighterName);
    }
  }

  componentWillReceiveProps() {
    this.setState({
      loading: true,
      fighter: null,
      sherdogData: null
    });
    if (this.props.history.location.state.opponent) {
        this.getFighter(this.props.history.location.state.opponent);
        this.getFighterFromSherdog(this.props.history.location.state.opponent);
    } else if (this.props.history.location.state.fighter) {
        this.getFighter(this.props.history.location.state.fighter);
        this.getFighterFromSherdog(this.props.history.location.state.fighter.first_name + "-" + this.props.history.location.state.fighter.last_name);
    }
  }

  getFighterFromSherdog(fighterName) {
    this.setState({ loading: true })
    if (fighterName.includes(" ")) {
      fighterName = fighterName.replace(" ", "-");
    }
    //Special case for GSP
    if (fighterName === "Georges-St-Pierre") {
      fighterName = "Georges-St.-Pierre";
    }
    axios.get(`/fighter/${fighterName}`)
    .then(res => {
      this.setState({
        sherdogData: res.data,
        loading: false,
        loaded:true
      })
    })
  }

  getFighter(name) {;
    this.setState({ loading: true })
    axios.get(`/fighters/${name}`)
    .then(res => {
      if (this.props.location.state.fighter) {
        let fighter = res.data.filter(d => d.id === this.props.location.state.fighter.id);
        this.setState({
          fighter: fighter[0],
          loading: false
        })
      } else if (this.props.location.state.fighterName) {
        let fighter = res.data.filter(d => d.first_name + " " + d.last_name === this.props.location.state.fighterName);
        this.setState({
          fighter: fighter[0],
          loading: false
        })
      } else if (this.props.location.state.opponent) {
        let fighter = res.data.filter(d => d.first_name + " " + d.last_name === this.props.location.state.opponent);
        this.setState({
          fighter: fighter[0],
          loading: false
        })
      }
    })
  }

  handleLoading() {
    if (this.state.loading) {
      return <div className="loading"></div>
    }
  }

  handleNotFound() {
    if (this.state.fighter === undefined) {
      console.log("undefined");
      return <h3>Fighter Not Found</h3>
    }
  }

  render() {
    let fighter_info;
    let fighter_img;
    let fighter_nickname;
    let weight_class;
    let p4p_rank;
    let rank;
    if (this.state.fighter) {
      // Format fighter stats
      // Weight Class:
      weight_class = this.state.fighter.weight_class.replace("_", " ");
      if (weight_class.includes("Women")) {
        weight_class = this.state.fighter.weight_class.split("_");
        weight_class = "Women's " + weight_class[1];
      }
      // Nickname:
     if (this.state.fighter.nickname) {
       fighter_nickname = '"' + this.state.fighter.nickname + '"';
     } else {
       fighter_nickname = '';
     }
     // Rank:
     if (!this.state.fighter.rank) {
       rank = "";
     } else if (this.state.fighter.rank === "C") {
       rank = "Champion";
     } else {
       rank = "Rank: " + this.state.fighter.rank;
     }
     // Pound for pound rank
     if (this.state.fighter.pound_for_pound_rank) {
       p4p_rank = "P4P Rank: " + this.state.fighter.pound_for_pound_rank;
     } else {
       p4p_rank = "";
     }
     fighter_img = <div className="single-fighter-img single-fighter-info">
       <h3>{this.state.fighter.first_name + " " + this.state.fighter.last_name}</h3>
       <h5>{fighter_nickname}</h5>
       <img src={this.state.fighter.thumbnail} alt=""></img>
     </div>
     fighter_info = <div className="fighter-info single-fighter-info">
       <p>{weight_class}</p>
       <p>{rank}</p>
       <p>{p4p_rank}</p>
       <p>Wins: {" " + this.state.fighter.wins}</p>
       <p>Losses: {" " + this.state.fighter.losses}</p>
       <p>Draws: {" " + this.state.fighter.draws}</p>
     </div>
    }
    //Sherdog Fighter Data:
    let sherdogData;
    let record;
    let recordData;
    if (this.state.sherdogData) {
      sherdogData = <div className="sherdog-data single-fighter-info">
        <p>{"Height: " + this.state.sherdogData.height}</p>
        <p>{"Weight: " + this.state.sherdogData.weight}</p>
        <p>{"Age: " + this.state.sherdogData.age}</p>
        <p>{"Gym: " + this.state.sherdogData.association}</p>
        <p>{"Fighting out of: " + this.state.sherdogData.locality}</p>
        <p>{"Country: " + this.state.sherdogData.nationality}</p>
      </div>
      record = this.state.sherdogData.fights.map(f => {
        let opponent;
        if (f.opponent === "Rafael dos Anjos") {
          opponent = "Rafael Dos Anjos";
        } else {
          opponent = f.opponent;
        }
        let result = f.result.charAt(0).toUpperCase() + f.result.substr(1);
        //Non DRY method of handling win/loss className
        if (result === "Win") {
          return <div className="record-item" key={f.date}>
            <div className="record-opponent"><Link className="link" to={{pathname: "/fighter", state: {opponent: opponent}}}>{opponent}</Link></div>
            <div className="record-result win">{result}</div>
            <div className="record-method">{f.method}</div>
            <div className="record-sub-info">
              <div className="record-round">{"Round: " + f.round}</div>
              <div className="record-time">{"Time: " + f.time}</div>
              <div className="record-date">{f.date}</div>
            </div>
          </div>
        } else if (result === "Loss") {
          return <div className="record-item" key={f.date}>
            <div className="record-opponent"><Link className="link" to={{pathname: "/fighter", state: {opponent: opponent}}}>{opponent}</Link></div>
            <div className="record-result loss">{result}</div>
            <div className="record-method">{f.method}</div>
            <div className="record-sub-info">
              <div className="record-round">{"Round: " + f.round}</div>
              <div className="record-time">{"Time: " + f.time}</div>
              <div className="record-date">{f.date}</div>
            </div>
          </div>
        } else {
          return <div className="record-item" key={f.date}>
            <div className="record-opponent"><Link className="link" to={{pathname: "/fighter", state: {opponent: opponent}}}>{opponent}</Link></div>
            <div className="record-result">{result}</div>
            <div className="record-method">{f.method}</div>
            <div className="record-sub-info">
              <div className="record-round">{"Round: " + f.round}</div>
              <div className="record-time">{"Time: " + f.time}</div>
              <div className="record-date">{f.date}</div>
            </div>
          </div>
        }
      })
      recordData = <div>
        <h3>Record</h3>
        {record}
      </div>
    } else {
      sherdogData = "";
      recordData = "";
    }
    console.log(this.state);
    console.log(this.props);
    return(
      <div className="main-content">
        {this.state.fighter && this.state ?
          <div>
            <div className="fighter-container">
              {fighter_img}
              {fighter_info}
              {sherdogData}
            </div>
            <div className="record">
              {recordData}
            </div>
          </div>
          :
          ""
        }
        {this.handleNotFound()}
        {this.handleLoading()}
      </div>
    )
  }
}

export default SingleFighter;
