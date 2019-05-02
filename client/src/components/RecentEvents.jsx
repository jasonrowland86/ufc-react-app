import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class RecentEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: '',
      loading: true
    }

  }

  componentWillReceiveProps() {
    this.setState({
      loading: false
    })
  }

  render() {
    console.log(this.props);
    //Get current date
    let current_date = new Date();
    current_date = current_date.toISOString();
    current_date = current_date.split("T");
    current_date = current_date[0];
    let latest_date = current_date.split("-");
    latest_date[0] = "2014";
    latest_date = latest_date[0] + "-" + latest_date[1] + "-" + latest_date[2];
    //initialize variables for scope and if there are events proceed
    let events;
    let upComingEvents;
    if (this.props.events) {
      // Filter events by date
      // upComingEvents = this.props.events.filter(e => e.event_date >= currentDate);
      // Use map to check for date without seconds
      upComingEvents = this.props.events.map(e => {
        let event_date = e.event_date.split("T");
        event_date = event_date[0];
        if (event_date < current_date && event_date > latest_date) {
          return e
        }
      })
      // console.log(upComingEvents);

      //Get the best available event title from the event object
      events = upComingEvents.map((e) => {
        let eventTitle = '';
        // Check that item in events array is not null or undefined
        if (e) {
          if (e.title_tag_line && !e.title_tag_line.includes("Live")) {
            if (e.title_tag_line.includes("TB")) {
              let split = e.title_tag_line.split(" ");
              let title_tag_line = "";
                for (let i = 0; i < split.length; i++) {
                  if (split[i].includes("TB")) {
                    title_tag_line += " TBD ";
                  } else {
                    title_tag_line += split[i];
                  }
                }
              eventTitle = title_tag_line;
            } else {
              eventTitle = e.title_tag_line;
            }
          } else {
              eventTitle = e.base_title;
            }

          //Format all event titles to be uniform
          if (eventTitle.includes("vs.")) {
            eventTitle = eventTitle.split("vs.");
            return <div className="list-item">
              <Link className="link event-title" to={{pathname: `/event/${e.id}`, state: {eventID: e.id, user: this.props.user} }}>
                <div className="event-title-item left-item">{eventTitle[0]}</div>
                <div className="event-title-center">vs</div>
                <div className="event-title-item right-item">{eventTitle[1]}</div>
              </Link>
            </div>
          } else if (eventTitle.includes("vs")) {
            eventTitle = eventTitle.split("vs");
            return <div className="list-item">
              <Link className="link event-title" to={{pathname: `/event/${e.id}`, state: {eventID: e.id, user: this.props.user} }}>
                <div className="event-title-item left-item">{eventTitle[0]}</div>
                <div className="event-title-center">vs</div>
                <div className="event-title-item right-item">{eventTitle[1]}</div>
              </Link>
            </div>
          } else {
            eventTitle = e.base_title;
            return <div className="list-item">
              <Link className="link event-title" to={{pathname: `/event/${e.id}`, state: {eventID: e.id, user: this.props.user} }}>
                <div className="event-title-center">{eventTitle}</div>
              </Link>
            </div>
          }
        }

      })
    }
    return(
      <div className="upcoming-events">
        <div className="event-list">
          {events}
        </div>
      </div>
    )
  }
}

export default RecentEvents;
