import React from 'react';
import UpComingEvents from './UpComingEvents';
import RecentEvents from './RecentEvents';
import axios from 'axios';

class Events extends React.Component {
  constructor() {
    super();
    this.state = {
      upcoming: true,
      loading: true
    }
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    axios.get('/events')
    .then(res => {
      this.setState({
        events: res.data.events,
        loading: false
      })
    })
  }

  handleRenderEvents() {
    if (this.props.upcoming) {
      return <UpComingEvents user={this.props.user} events={this.state.events}/>
    } else {
      return <RecentEvents user={this.props.user} events={this.state.events}/>
    }
  }

  handleLoading() {
    if (this.state.loading) {
      return <div className="loading"></div>
    }
  }

  render() {
    console.log(this.props);
    return(
      <div className="events info-item">
        {this.props.upcoming ?
          <h3>Upcoming Events</h3>
          :
          <h3>Recent Events</h3>
        }
        <div className="info-list">
          {this.handleLoading()}
          {this.handleRenderEvents()}
        </div>
      </div>
    )
  }
}

export default Events;
