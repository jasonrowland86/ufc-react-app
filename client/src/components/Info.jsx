import React from 'react';
import UpComingEvents from './UpComingEvents';
import Events from './Events';
import TitleHolders from './TitleHolders';
import PoundForPound from './PoundForPound';
import axios from 'axios';

class Info extends React.Component {
  constructor() {
    super();
    this.state = {
      upcoming: true
    }
    this.handleEventState = this.handleEventState.bind(this);
  }

  handleEventState() {
    if (this.state.upcoming) {
      this.setState({
        upcoming: false
      })
    } else {
      this.setState({
        upcoming: true
      })
    }
  }

  render() {
    console.log(this.props);
    return(
      <div className="info">
        <div className="info-container">
          <TitleHolders />
          <Events user={this.props.user} upcoming={this.state.upcoming}/>
          <PoundForPound />
        </div>
        <br/>
        <div className="event-buttons">
          {this.state.upcoming ?
            <button onClick={this.handleEventState}>Recent Events</button>
            :
            <button onClick={this.handleEventState}>Upcoming Events</button>
          }
        </div>
        <br/>
      </div>
    )
  }
}

export default Info;
