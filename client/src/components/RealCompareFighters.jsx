import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class CompareFighters extends React.Component {
  constructor() {
    super();
    this.state = {
      fighter1: null,
      fighter2: null,
      loading: false
    }
  }

  componentDidMount() {
    console.log(this.props);
    console.log(this.state);
    this.getFighters();
    this.getFightersFromSherdog(this.props.location.state.fighter1, this.props.location.state.fighter2);
  }

  componentWillReceiveProps() {
    if (this.props.location.state.user) {

    }
    this.getPicks();
    this.setState({
      event_id: this.props.location.state.eventID,
      fighter1: this.props.location.state.fighter1,
      fighter2: this.props.location.state.fighter2,
      fighters: true,
    })
  }

  getFightersFromSherdog(fighter1Name, fighter2Name) {
    if (fighter1Name.includes(" ")) {
      fighter1Name = fighter1Name.replace(" ", "-");
    }
    if (fighter2Name.includes(" ")) {
      fighter2Name = fighter2Name.replace(" ", "-");
    }
    axios.get(`/fighter/${fighter1Name}`)
    .then(res => {
      this.setState({
        fighter1SherdogData: res.data
      })
      console.log("Sherdog Fighter1: ", res.data);
    })
    axios.get(`/fighter/${fighter2Name}`)
    .then(res => {
      this.setState({
        fighter2SherdogData: res.data,
        sherdog: true
      })
      console.log("Sherdog Fighter2: ", res.data);
    })
  }

  getFighters() {
    this.setState({
      loading: true
    })
    axios.get(`/fighters`)
    .then(res => {
      console.log("data: ", res.data);
      let fighter1 = res.data.filter(d => d.first_name + ' ' + d.last_name === this.props.location.state.fighter1);
      let fighter2 = res.data.filter(d => d.first_name + ' ' + d.last_name === this.props.location.state.fighter2);
      console.log(fighter1, fighter2);
      this.setState({
        fighter1: fighter1[0],
        fighter2: fighter2[0],
        fighters: true,
        loading: false
      })
    })
  }

  handleFighter1NotFound() {
    if (this.state.fighter1 === undefined) {
      console.log("undefined");
      return <p>Fighter Not Found</p>
    }
  }

  handleFighter2NotFound() {
    if (this.state.fighter2 === undefined) {
      console.log("undefined");
      return <p>Fighter Not Found</p>
    }
  }

  handleLoading() {
    if (this.state.loading) {
      return <div className="loading"></div>
    }
  }

  getPicks() {
    console.log("getPicks");
    axios.get('/user/picks')
    .then(res => {
      console.log(res);
      this.setState({
        picks: res.data.picks,
        user: res.data.user
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  // getPicks() {
  //   console.log("getPicks");
  //   axios.get(`/user/picks/${}`)
  //   .then(res => {
  //     console.log(res);
  //     this.setState({
  //       picks: res.data.picks,
  //       user: res.data.user
  //     })
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }

  addFighter(fighter_name, fighter_id, event_id, previousPick_ID) {
    console.log(fighter_name, fighter_id, event_id, previousPick_ID);
    axios.post('/user/picks', {
      fighter_name: fighter_name,
      fighter_id: fighter_id,
      event_id: event_id,
      previousPick_ID: previousPick_ID
    })
    // .then((res) => {
    //   console.log("added!");
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err);
    // })
    this.setState({
      fireRedirect: true
    })
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    let compareStats;
    let fighter1_weight_class;
    let fighter2_weight_class;
    let fighter1_name;
    let fighter2_name;
    let fighter1_img;
    let fighter2_img;
    let fighter1_nickname;
    let fighter2_nickname;
    let fighter1_rank;
    let fighter2_rank;
    let fighter1_record;
    let fighter2_record;
    let fighter1_height;
    let fighter1_weight;
    let fighter1_reach;
    let fighter2_height;
    let fighter2_weight;
    let fighter2_reach;
    //Fighter1
    if (this.state.fighter1SherdogData) {
      fighter1_record = this.state.fighter1SherdogData.fights.map(f => {
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
    }
    //Fighter 2
    if (this.state.fighter2SherdogData) {
      fighter2_record = this.state.fighter2SherdogData.fights.map(f => {
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
    }
    if (this.props.location.state.fighter1_stats) {
      fighter1_height = this.props.location.state.fighter1_stats.height;
      fighter1_weight = this.props.location.state.fighter1_stats.weight;
      fighter1_reach = this.props.location.state.fighter1_stats.reach;
    } else {
      fighter1_height = "N/A";
      fighter1_weight = "N/A";
      fighter1_reach = "N/A";
    }
    if (this.props.location.state.fighter2_stats) {
      fighter2_height = this.props.location.state.fighter2_stats.height;
      fighter2_weight = this.props.location.state.fighter2_stats.weight;
      fighter2_reach = this.props.location.state.fighter2_stats.reach;
    } else {
      fighter2_height = "N/A";
      fighter2_weight = "N/A";
      fighter2_reach = "N/A";
    }
    if (this.state.fighters) {
      // Format fighter stats
      // Weight Class:
      fighter1_weight_class = this.state.fighter1.weight_class.replace("_", " ");
      if (fighter1_weight_class.includes("Women")) {
        fighter1_weight_class = this.state.fighter1.weight_class.split("_");
        fighter1_weight_class = "Women's " + fighter1_weight_class[1];
      }
      fighter2_weight_class = this.state.fighter2.weight_class.replace("_", " ");
      if (fighter2_weight_class.includes("Women")) {
        fighter2_weight_class = this.state.fighter2.weight_class.split("_");
        fighter2_weight_class = "Women's " + fighter2_weight_class[1];
      }
      // Nickname
     if (this.state.fighter1.nickname) {
       fighter1_nickname = <h4>{'"' + this.state.fighter1.nickname + '"'}</h4>;
     } else {
       fighter1_nickname = "";
     }
     if (this.state.fighter2.nickname) {
       fighter2_nickname = <h4>{'"' + this.state.fighter2.nickname + '"'}</h4>;
     } else {
       fighter2_nickname = "";
     }
     // Rank:
     if (!this.state.fighter1.rank || this.state.fighter1.rank === null) {
       fighter1_rank = "N/A";
     }  else {
       fighter1_rank = this.state.fighter1.rank;
     }
     if (!this.state.fighter2.rank || this.state.fighter2.rank === null) {
       fighter2_rank = "N/A";
     } else {
       fighter2_rank = this.state.fighter2.rank;
     }
     // Fighter Img:
     fighter1_img = <img className="left-img" src={this.state.fighter1.left_full_body_image}></img>
     fighter2_img = <img className="right-img" src={this.state.fighter2.right_full_body_image}></img>
     // Fighter Name:
     fighter1_name = <div className="fighter-name">
       <Link className="link" to={{pathname: "/fighter", state: {fighter: this.state.fighter1} }}>
         {
           <div>
             <h2>{this.state.fighter1.first_name}</h2>
             {fighter1_nickname}
             <h2>{this.state.fighter1.last_name}</h2>
           </div>
         }
       </Link>
     </div>
     fighter2_name = <div className="fighter-name">
       <Link className="link" to={{pathname: "/fighter", state: {fighter: this.state.fighter2} }}>
         {
           <div>
             <h2>{this.state.fighter2.first_name}</h2>
             {fighter2_nickname}
             <h2>{this.state.fighter2.last_name}</h2>
           </div>
         }
        </Link>
     </div>
     // Compared Stats:
     compareStats = <div className="compare-stats-container">
      <h2 className="compare-vs">vs</h2>
      <div className="compare-row">
        <h3>{fighter1_weight_class}</h3>
      </div>
      <div className="compare-row">
        <div className="compare-item">{fighter1_rank}</div>
        <div className="compare-item-center"><h4>Rank</h4></div>
        <div className="compare-item">{fighter2_rank}</div>
      </div>
      <div className="compare-row">
        <div className="compare-item">{fighter1_height}</div>
        <div className="compare-item-center"><h4>Height</h4></div>
        <div className="compare-item">{fighter2_height}</div>
      </div>
      <div className="compare-row">
        <div className="compare-item">{fighter1_weight}</div>
        <div className="compare-item-center"><h4>Weight</h4></div>
        <div className="compare-item">{fighter2_weight}</div>
      </div>
      <div className="compare-row">
        <div className="compare-item">{fighter1_reach}</div>
        <div className="compare-item-center"><h4>Reach</h4></div>
        <div className="compare-item">{fighter2_reach}</div>
      </div>
      <div className="compare-row">
        <div className="compare-item">{this.state.fighter1.wins}</div>
        <div className="compare-item-center"><h4>Wins</h4></div>
        <div className="compare-item">{this.state.fighter2.wins}</div>
      </div>
      <div className="compare-row">
        <div className="compare-item">{this.state.fighter1.losses}</div>
        <div className="compare-item-center"><h4>Losses</h4></div>
        <div className="compare-item">{this.state.fighter2.losses}</div>
      </div>
      <div className="compare-row">
        <div className="compare-item">{this.state.fighter1.draws}</div>
        <div className="compare-item-center"><h4>Draws</h4></div>
        <div className="compare-item">{this.state.fighter2.draws}</div>
      </div>
    </div>
    }
    //Get current date and event date for comaprison
    let current_date = new Date();
    current_date = current_date.toISOString();
    current_date = current_date.split("T");
    current_date = current_date[0];
    console.log(current_date);

    let event_date = this.props.location.state.eventDate.split("T");
    event_date = event_date[0];
    console.log(event_date);

    console.log(this.state);
    console.log(this.props);
    //Handle the addFighter button, if a fighter has been selected -
    //it will not have a button to add that fighter again. Only one -
    //pick per matchup. The fighter that is not selected can be added -
    //but will replace the previous pick.
    let selectedFighter;
    let addFighter1 = <button style={{visibility: "hidden"}} ></button>;;
    let addFighter2 = <button style={{visibility: "hidden"}} ></button>;;
    if (this.props.location.state.user && this.state.fighters) {
      selectedFighter = this.props.location.state.user.picks.filter(p => p.name === this.state.fighter1.first_name + " " + this.state.fighter1.last_name || p.name === this.state.fighter2.first_name + " " + this.state.fighter2.last_name && p.eventID === this.props.location.state.eventID);
      console.log(selectedFighter);
      if (selectedFighter.length > 0) {
        if (selectedFighter[0].name === this.state.fighter1.first_name + " " + this.state.fighter1.last_name) {
          addFighter2 = <button onClick={() => this.addFighter(this.state.fighter2.first_name + " " + this.state.fighter2.last_name, this.state.fighter2.id, this.props.location.state.eventID, selectedFighter[0]._id)} >Add Fighter</button>;
        }
        if (selectedFighter[0].name === this.state.fighter2.first_name + " " + this.state.fighter2.last_name) {
          addFighter1 = <button onClick={() => this.addFighter(this.state.fighter1.first_name + " " + this.state.fighter1.last_name, this.state.fighter1.id, this.props.location.state.eventID, selectedFighter[0]._id)} >Add Fighter</button>;
        }
      } else {
        addFighter1 = <button className={"add-button"} onClick={() => this.addFighter(this.state.fighter1.first_name + " " + this.state.fighter1.last_name, this.state.fighter1.id, this.props.location.state.eventID)} >Add Fighter</button>
        addFighter2 = <button className={"add-button"} onClick={() => this.addFighter(this.state.fighter2.first_name + " " + this.state.fighter2.last_name, this.state.fighter2.id, this.props.location.state.eventID)} >Add Fighter</button>
      }
    }
    console.log(addFighter1, addFighter2);

    return(
      <div className="main-content">
        <div className="above-fighters-container">
          <Link className="link back-to-card" to={{pathname: `/event/${this.props.location.state.eventID}`, state: {eventID: this.props.location.state.eventID, user: this.props.location.state.user} }}>Back to Card</Link>
        </div>
        <div className="fighters-container">
          {this.handleFighter1NotFound()}
          <div className="fighter-img">{fighter1_img}</div>
          <div className="compare-container">
            {fighter1_name}
            {compareStats}
            {fighter2_name}
          </div>
          <div className="fighter-img">{fighter2_img}</div>
          {this.handleFighter2NotFound()}
        </div>

        <div className="compare-records">
          <div className="single-record">
            {this.props.location.state.user && this.state.loading === false && event_date >= current_date ?
              addFighter1
              :
              ""
            }
            {fighter1_record}
          </div>
          <div className="single-record">
            {this.props.location.state.user && this.state.loading === false && event_date >= current_date ?
              addFighter2
              :
              ""
            }
            {fighter2_record}
          </div>
        </div>
        {this.handleLoading()}
        {this.state.fireRedirect &&
          <Redirect to={{pathname: `/event/${this.props.location.state.eventID}`, state: {eventID: this.props.location.state.eventID, user: this.props.location.state.user} }} />
        }
      </div>
    )
  }
}

export default CompareFighters;
