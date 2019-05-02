import React from 'react';
import { Link } from 'react-router-dom';
import PickGroup from './PickGroup';
import axios from 'axios';

class UserDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true
    }
  }

  componentDidMount() {
    this.getUser();
  }

  componentWillReceiveProps() {
    this.getUser();
  }

  getEvents() {
    axios.get('/events')
    .then(res => {
      this.setState({
        events: res.data.events
      })
      this.handlePicks();
    })
  }

  getUser() {
    axios.get('/user')
    .then(res => {
      console.log(res.data);
      this.setState({
        user: res.data
      })
    }).catch(err => {
      console.log(err);
    });
    this.getEvents();
  }

  handleDelete(e) {
    e.preventDefault();
    let id = e.target.id;
    console.log(e.target.id);
    axios.delete(`/user/picks/${id}`)
    .then(res => {
      console.log('deleted');
      this.getUser();
    });
    this.getUser();
  }

  handlePicks() {
    console.log("handlePicks");
    let events;
    if (this.state.events) {
      //This works but takes too long
      //Filter events not used to cut time down but still needs work
      events = this.state.events.filter(e => e.event_date > "2016-01-01T00:00:00Z");
      events = events.map(e => {
        let eventSubtitle;
        for (let i = 0; i < this.state.user.user.picks.length; i++) {
          if (e.id === this.state.user.user.picks[i].eventID) {
            //Get best event subtitle
            if (e.title_tag_line === null) {
              if (e.subtitle.includes("vs")) {
                eventSubtitle = e.subtitle;
              } else {
                eventSubtitle = "";
              }
            } else if (e.title_tag_line.includes("Live")) {
              if (e.subtitle.includes("vs")) {
                eventSubtitle = e.subtitle;
              } else {
                eventSubtitle = "";
              }
            } else {
              eventSubtitle = e.title_tag_line
            }
            // Format TBA to match TBD
            eventSubtitle = eventSubtitle.split("vs");
            for (let i = 0; i < eventSubtitle.length; i++) {
              if (eventSubtitle[i].includes("TBA")) {
                eventSubtitle[i] = "TBD ";
              }
            }
            eventSubtitle = <h2>{eventSubtitle[0] + "vs" + eventSubtitle[1]}</h2>;
          }
        }
        //Filter picks to by event id
        let picks = this.state.user.user.picks.filter(p => p.eventID === e.id);
        picks = picks.map(p => {
          return <h3 onDoubleClick={this.handleDelete.bind(this)} id={p._id} key={p._id}>{p.name}</h3>
        })

        return <PickGroup eventSubtitle={eventSubtitle} picks={picks} />
      })
    }
    this.setState({loading: false, picksByEvents: events})
  }

  handleLoading() {
    if (this.state.loading) {
      return <div className="loading"></div>
    }
  }

  render() {
    console.log(this.props);
    console.log(this.state);

    let userName;
    if (this.state.user) {
      userName = this.state.user.name
    }
    let users;
    if (this.state.users) {
      users = this.state.users.map(u => {
        return <h3 onDoubleClick={this.handleDelete.bind(this)} id={u._id} >{u.name}</h3>
      })
    }
    return(
      <div className="main-content">
        <h3>Dashboard</h3>
        <div className="dash-container">
          <div className="dash-picks">
            <h1>Picks</h1>
            {this.handleLoading()}
            {this.state.picksByEvents}
          </div>
          <div className="dash-stats" >
            <h1>Stats</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default UserDash;
