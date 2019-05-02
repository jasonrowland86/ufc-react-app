import React from 'react';

class PickGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventSubtitle: this.props.eventSubtitle,
      picks: this.props.picks,
      show: {
        display: "none"
      },
      showPicks: false
    }
    this.showPicks = this.showPicks.bind(this);
  }

  showPicks() {
    if (!this.state.showPicks) {
      this.setState({
        show: {
          display: "block"
        },
        showPicks: true
      })
    } else {
      this.setState({
        show: {
          display: "none"
        },
        showPicks: false
      })
    }
  }

  render() {
    return(
      <div className="PickGroup">
        <div className="pick-group" onClick={this.showPicks}>
          {this.state.eventSubtitle}
        </div>
        <div style={this.state.show}>
          {this.state.picks}
        </div>
      </div>
    )
  }
}

export default PickGroup;
