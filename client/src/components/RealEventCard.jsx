import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EventCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }

  }

  componentWillReceiveProps(props) {
    this.setState({
      eventID: this.props.location.state.eventID,
      card: '',
      eventTitle: '',
      eventSubtitle: '',
      eventDate: '',
      eventLocation: '',
      loading: true,
    }, () => {
      this.getFighters();
    })
  }

  componentDidMount() {
    this.getFighters();
  }

  getFighters() {
    this.setState({
      card: null,
      eventTitle: null,
      eventSubtitle: null,
      eventDate: null,
      eventLocation: null,
      allFighters: null,
      fighters: null,
      loading: true,
    })
    axios.get(`/fighters`)
    .then(res => {
      this.setState({
        allFighters: res.data,
      }, () => {
        this.getCard(this.props.location.state.eventID);
        //Add if statement to run getPicks
        this.getPicks();
      })
    })
  }

  getPicks() {
    console.log("getPicks");
    //Need to handle getting specific users picks
    //axios.get(`/user/${}/picks`)
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
  //   this.setState({
  //     picks: this.props.location.state.user.picks,
  //     user: this.props.location.state.user
  //   })
  // }

  getCard(id) {
    axios.get(`/card/${id}`)
    .then(res => {
      console.log("card: ", res);
      // Get the best subtitle option available
      let eventSubtitle;
      if (res.data.card_event.title_tag_line === null) {
        if (res.data.card_event.subtitle.includes("vs")) {
          eventSubtitle = res.data.card_event.subtitle;
        } else {
          eventSubtitle = "";
        }
      } else if (res.data.card_event.title_tag_line.includes("Live")) {
        if (res.data.card_event.subtitle.includes("vs")) {
          eventSubtitle = res.data.card_event.subtitle;
        } else {
          eventSubtitle = "";
        }
      } else {
        eventSubtitle = res.data.card_event.title_tag_line
      }
      // Format TBA to match TBD
      eventSubtitle = eventSubtitle.split("vs");
      for (let i = 0; i < eventSubtitle.length; i++) {
        if (eventSubtitle[i].includes("TBA")) {
          eventSubtitle[i] = "TBD ";
        }
      }
      eventSubtitle = eventSubtitle[0] + "vs" + eventSubtitle[1];

      // Get match ids to use if fighter names do not exist in card
      let match_ids;
      let fighters;
      //Get fighter ids in match array
      match_ids = res.data.card.map(c => {
        let match = [];
        match.push(c.fighter1_id);
        match.push(c.fighter2_id);
        return match
      })
      //Filter each set of match ids to match the fighter data
      fighters = match_ids.map(m => {
        let match = [];
        let fighter1 = m[0];
        let fighter2 = m[1];
        match.push(this.state.allFighters.filter(f => f.id === fighter1 ));
        match.push(this.state.allFighters.filter(f => f.id === fighter2 ))
        return match
      })
      this.setState({
        card: res.data,
        eventTitle: res.data.card_event.base_title,
        eventSubtitle: eventSubtitle,
        eventDate: res.data.card_event.event_date,
        eventLocation: res.data.card_event.location,
        loading: false,
        fighters: fighters
      })
    })
  }

  convertMonth(x) {
    let month = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

    let textMonth = month[x];
    return textMonth
  }

  handleLoading() {
    if (this.state.loading) {
      return <div className="loading"></div>
    }
  }

  render() {
    console.log(this.state);
    console.log(this.props);
    let eventDate;
    let matchUps;
    let matchUpsById;
    //If card is loaded
    if (this.state.card && this.state.fighters) {
      //If card names exist
      if (this.state.card.card[0].fighter1_first_name) {
        console.log("card has firstName");
        matchUps = this.state.card.card.map(c => {
          let fighter1_stats = {
            height: c.fighter1height,
            weight: c.fighter1weight,
            reach: c.fighter1reach,
            takedown_defense: c.fighter1_takedowndefense,
            takedown_accuracy: c.fighter1_takedownaccuracy,
            striking_defense: c.fighter1_strikingdefense,
            striking_accuracy: c.fighter1_strikingaccuracy,
            strikes_per_min: c.fighter1_slpm,
            take_down_average: c.fighter1_takedowndefense,
            average_fight_time: c.fighter1_averagefighttime
          }
          let fighter2_stats = {
            height: c.fighter2height,
            weight: c.fighter2weight,
            reach: c.fighter2reach,
            takedown_defense: c.fighter2_takedowndefense,
            takedown_accuracy: c.fighter2_takedownaccuracy,
            striking_defense: c.fighter2_strikingdefense,
            striking_accuracy: c.fighter2_strikingaccuracy,
            strikes_per_min: c.fighter2_slpm,
            take_down_average: c.fighter2_takedowndefense,
            average_fight_time: c.fighter2_averagefighttime
          }
          let fighter1_thumbnail = <div className="event-card-thumbnail"><img src="http://imagec.ufc.com/http%253A%252F%252Fmedia.ufc.tv%252Fgenerated_images_sorted%252FFighter%252FBlagoy-Ivanov%252FBlagoy-Ivanov_654962_medium_thumbnail.jpg?mw300-mh300-tc1" alt=""></img></div>;
          let fighter2_thumbnail = <div className="event-card-thumbnail"><img src="http://imagec.ufc.com/http%253A%252F%252Fmedia.ufc.tv%252Fgenerated_images_sorted%252FFighter%252FBlagoy-Ivanov%252FBlagoy-Ivanov_654962_medium_thumbnail.jpg?mw300-mh300-tc1" alt=""></img></div>;
          for (let i = 0; i < this.state.fighters.length; i++) {
            //If there is fighter data get thumbnail if not use the above src
            if (this.state.fighters[i][0].length > 0) {
              if (this.state.fighters[i][0][0].first_name + " " + this.state.fighters[i][0][0].last_name === c.fighter1_first_name + " " + c.fighter1_last_name) {
                // console.log(this.state.fighters[i][0][0].first_name + " " + this.state.fighters[i][0][0].last_name, this.state.fighters[i][0][0]);
                fighter1_thumbnail = <div className="event-card-thumbnail"><img src={this.state.fighters[i][0][0].thumbnail} alt=""></img></div>
              }
            }
            if (this.state.fighters[i][1].length > 0) {
              if (this.state.fighters[i][1][0].first_name + " " + this.state.fighters[i][1][0].last_name === c.fighter2_first_name + " " + c.fighter2_last_name) {
                // console.log(this.state.fighters[i][1][0].first_name + " " + this.state.fighters[i][1][0].last_name, this.state.fighters[i][1][0]);
                fighter2_thumbnail = <div className="event-card-thumbnail"><img src={this.state.fighters[i][1][0].thumbnail} alt=""></img></div>
              }
            }
          }
          //Show if fighter on card is in users picks
          let selected1 = <div style={{visibility: "hidden"}}>X</div>;
          let selected2 = <div style={{visibility: "hidden"}}>X</div>;
          // if (this.props.location.state.user) {
          //   for (let i = 0; i < this.props.location.state.user.picks.length; i++) {
          //     console.log(this.props.location.state.user.picks[i].name, c.fighter1_first_name + " " + c.fighter1_last_name, c.fighter2_first_name + " " + c.fighter2_last_name);
          //     if (this.props.location.state.user.picks[i].name === c.fighter1_first_name + " " + c.fighter1_last_name && this.props.location.state.user.picks[i].eventID === this.props.location.state.eventID) {
          //       selected1 = <div>X</div>;
          //       selected2 = <div style={{visibility: "hidden"}}>X</div>;
          //     } else if (this.props.location.state.user.picks[i].name === c.fighter2_first_name + " " + c.fighter2_last_name && this.props.location.state.user.picks[i].eventID === this.props.location.state.eventID) {
          //       selected2 = <div>X</div>;
          //       selected1 = <div style={{visibility: "hidden"}}>X</div>;
          //     }
          //   }
          // }
          if (this.state.picks) {
            for (let i = 0; i < this.state.picks.length; i++) {
              // console.log(this.state.picks[i].name, c.fighter1_first_name + " " + c.fighter1_last_name, c.fighter2_first_name + " " + c.fighter2_last_name);
              if (this.state.picks[i].name === c.fighter1_first_name + " " + c.fighter1_last_name && this.state.picks[i].eventID === this.props.location.state.eventID) {
                selected1 = <div>X</div>;
                selected2 = <div style={{visibility: "hidden"}}>X</div>;
              } else if (this.state.picks[i].name === c.fighter2_first_name + " " + c.fighter2_last_name && this.state.picks[i].eventID === this.props.location.state.eventID) {
                selected2 = <div>X</div>;
                selected1 = <div style={{visibility: "hidden"}}>X</div>;
              }
            }
          }

          // let matches = this.state.fighters.map(f => {
          //   console.log(f[0][0]);
          // })

          // let match = this.state.fighters.filter(f => f[0][0].first_name + " " + f[0][0].last_name === c.fighter1_first_name + " " + c.fighter1_last_name);
          // console.log(match);
          // if (match[0][0].thumbnail) {
          //   fighter1_thumbnail = <div className="event-card-thumbnail"><img src={match[0][0].thumbnail} alt=""></img></div>
          // } else {
          //   fighter1_thumbnail = ""
          // }
          // if (match[0][1].thumbnail) {
          //   fighter2_thumbnail = <div className="event-card-thumbnail"><img src={match[0][1].thumbnail} alt=""></img></div>
          // } else {
          //   fighter2_thumbnail = ""
          // }
          let count = 1;
          return <div key={count++}>
            <Link className="link event-title" to={{
                pathname: '/fighters',
                state: {
                  fighter1: c.fighter1_first_name + " " + c.fighter1_last_name,
                  fighter2: c.fighter2_first_name + " " + c.fighter2_last_name,
                  eventID: this.props.location.state.eventID,
                  fighter1_stats: fighter1_stats,
                  fighter2_stats: fighter2_stats,
                  user: this.state.user,
                  eventDate: this.state.eventDate
                  }
                }}>
                {selected1}
                {fighter1_thumbnail}
                <div className="event-title-item left-item">{c.fighter1_first_name + " " + c.fighter1_last_name}</div>
                <div className="event-title-center">vs</div>
                <div className="event-title-item right-item">{c.fighter2_first_name + " " + c.fighter2_last_name}</div>
                {fighter2_thumbnail}
                {selected2}
            </Link>
          </div>
        })
      } else {
        console.log("card card noName");
        matchUpsById = this.state.fighters.map(f => {
          // console.log(f);
          let fighter1_stats;
          let fighter2_stats;
          //Fix this **********************************************************************
          if (f[0].length > 0 && f[1].length > 0) {
            for (let i = 0; i < this.state.card.card.length; i++) {
              if (this.state.card.card[0].fighter1_first_name + " " + this.state.card.card.fighter1_last_name === f[0][0].first_name + ' ' + f[0][0].last_name) {
                fighter1_stats = {
                  height: this.state.card.card[0].fighter1height,
                  weight: this.state.card.card[0].fighter1weight,
                  reach: this.state.card.card[0].fighter1reach,
                  takedown_defense: this.state.card.card[0].fighter1_takedowndefense,
                  takedown_accuracy: this.state.card.card[0].fighter1_takedownaccuracy,
                  striking_defense: this.state.card.card[0].fighter1_strikingdefense,
                  striking_accuracy: this.state.card.card[0].fighter1_strikingaccuracy,
                  strikes_per_min: this.state.card.card[0].fighter1_slpm,
                  take_down_average: this.state.card.card[0].fighter1_takedowndefense,
                  average_fight_time: this.state.card.card[0].fighter1_averagefighttime
                }
              }
            }
            for (let i = 0; i < this.state.card.card.length; i++) {
              if (this.state.card.card[0].fighter2_first_name + " " + this.state.card.card.fighter2_last_name === f[1][0].first_name + ' ' + f[1][0].last_name) {
                fighter2_stats = {
                  height: this.state.card.card[1].fighter2height,
                  weight: this.state.card.card[1].fighter2weight,
                  reach: this.state.card.card[1].fighter2reach,
                  takedown_defense: this.state.card.card[1].fighter2_takedowndefense,
                  takedown_accuracy: this.state.card.card[1].fighter2_takedownaccuracy,
                  striking_defense: this.state.card.card[1].fighter2_strikingdefense,
                  striking_accuracy: this.state.card.card[1].fighter2_strikingaccuracy,
                  strikes_per_min: this.state.card.card[1].fighter2_slpm,
                  take_down_average: this.state.card.card[1].fighter2_takedowndefense,
                  average_fight_time: this.state.card.card[1].fighter2_averagefighttime
                }
              }
            }
          }
          //Show if fighter on card is in users picks
          // let selected1 = <div style={{visibility: "hidden"}}>X</div>;
          // let selected2 = <div style={{visibility: "hidden"}}>X</div>;
          // if (this.props.location.state.user) {
          //   for (let i = 0; i < this.props.location.state.user.picks.length; i++) {
          //     console.log(this.props.location.state.user.picks[i].name, f[0][0].first_name + ' ' + f[0][0].last_name, f[1][0].first_name + ' ' + f[1][0].last_name);
          //     if (this.props.location.state.user.picks[i].name === f[0][0].first_name + ' ' + f[0][0].last_name && this.props.location.state.user.picks[i].eventID === this.props.location.state.eventID) {
          //       selected1 = <div>X</div>;
          //       selected2 = <div style={{visibility: "hidden"}}>X</div>;
          //     } else if (this.props.location.state.user.picks[i].name === f[1][0].first_name + ' ' + f[1][0].last_name && this.props.location.state.user.picks[i].eventID === this.props.location.state.eventID) {
          //       selected2 = <div>X</div>;
          //       selected1 = <div style={{visibility: "hidden"}}>X</div>;
          //     }
          //   }
          // }
          let selected1 = <div style={{visibility: "hidden"}}>X</div>;
          let selected2 = <div style={{visibility: "hidden"}}>X</div>;
          if (this.state.picks) {
            for (let i = 0; i < this.state.picks.length; i++) {
              // console.log(this.state.picks[i].name, f[0][0].first_name + ' ' + f[0][0].last_name, f[1][0].first_name + ' ' + f[1][0].last_name);
              if (this.state.picks[i].name === f[0][0].first_name + ' ' + f[0][0].last_name && this.state.picks[i].eventID === this.props.location.state.eventID) {
                selected1 = <div>X</div>;
                selected2 = <div style={{visibility: "hidden"}}>X</div>;
              } else if (this.state.picks[i].name === f[1][0].first_name + ' ' + f[1][0].last_name && this.state.picks[i].eventID === this.props.location.state.eventID) {
                selected2 = <div>X</div>;
                selected1 = <div style={{visibility: "hidden"}}>X</div>;
              }
            }
          }
          if (!f[0][0].first_name.startsWith(".") && f[0].length > 0 && f[1].length > 0) {
            // console.log(f[1][0]);
            return <div key={f[0][0].id}>
              <Link className="link event-title" to={{
                  pathname: '/fighters',
                  state: {
                    fighter1: f[0][0].first_name + ' ' + f[0][0].last_name,
                    fighter2: f[1][0].first_name + ' ' + f[1][0].last_name,
                    eventID: this.props.location.state.eventID,
                    fighter1_stats: fighter1_stats,
                    fighter2_stats: fighter2_stats,
                    user: this.state.user,
                    eventDate: this.state.eventDate
                    }
                  }}>
                  {selected1}
                  <div className="event-card-thumbnail"><img src={f[0][0].thumbnail} alt=""></img></div>
                  <div className="event-title-item left-item">{f[0][0].first_name + ' ' + f[0][0].last_name}</div>
                  <div className="event-title-center">vs</div>
                  <div className="event-title-item right-item">{f[1][0].first_name + ' ' + f[1][0].last_name}</div>
                  <div className="event-card-thumbnail"><img src={f[1][0].thumbnail} alt=""></img></div>
                  {selected2}
              </Link>
            </div>
          }
        })
      }
    }
    // Reformat date
    if (this.state.eventDate) {
      eventDate = this.state.eventDate.split("T");
      eventDate = eventDate[0].split("-");
      if (eventDate[1].startsWith("0")) {
        eventDate[1] = eventDate[1].substr(1);
      }
      eventDate[1] = this.convertMonth(eventDate[1]);
      eventDate = <p>{eventDate[1] + " - " + eventDate[2] + " - " + eventDate[0]}</p>;
    }
    console.log(this.state);
    console.log(this.props);
    return(
      <div className="main-content">
        <div className="card-container">
          <h3>{this.state.eventTitle}</h3>
          {this.state.eventSubtitle && !this.state.eventSubtitle.includes("undefined") ?
            <h4>{'"' + this.state.eventSubtitle + '"'}</h4>
            : ''
          }
          <p>{this.state.eventLocation}</p>
          {eventDate}
          {matchUps}
          {matchUpsById}
          {this.handleLoading()}
        </div>
      </div>
    )
  }
}

export default EventCard;
