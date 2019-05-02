import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TitleHolders extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      fighters: null
    }
  }

  componentDidMount() {
    this.getFighters();
  }

  getFighters() {
    this.setState({ loading: true })
    axios.get(`/fighters`)
    .then(res => {
      console.log(res);
      this.setState({
        fighters: res.data,
        loading: false
      })
    })
  }

  handleLoading() {
    if (this.state.loading) {
      return <div className="loading"></div>
    }
  }

  render() {
    let weightClassOrder = [
      "Heavyweight",
      "Light_Heavyweight",
      "Middleweight",
      "Welterweight",
      "Lightweight",
      "Bantamweight",
      "Featherweight",
      "Flyweight",
      "Women_Featherweight",
      "Women_Bantamweight",
      "Women_Flyweight",
      "Women_Strawweight"
    ];
    let titleHolders;
    let firstName;
    let lastName;
    if (this.state.fighters) {
      // Filter fighters by title holders
      titleHolders = this.state.fighters.filter(f => f.title_holder);
      console.log(titleHolders);
      // Map title holders to Links
      let sorted = [];
      //Order the fighters by weight class order
      for (let i = 0; i < titleHolders.length; i++) {
        for (let y = 0; y < weightClassOrder.length; y++) {
          if (titleHolders[y].weight_class === weightClassOrder[i]) {
            sorted.push(titleHolders[y]);
          }
        }
      }
      //Map each title holder to a Link
      titleHolders = sorted.map(t => {
        let weightClass = t.weight_class;
        if (weightClass.includes("_")) {
          weightClass = weightClass.replace("_", " ");
        }
        if (weightClass.includes("Women")) {
          weightClass = weightClass.replace("Women", "W");
        }
        //If statement for Heavyweight class due to double title holder error
        // if (weightClass === "Heavyweight" && t.first_name === "To be determined...") {
        //   firstName = "Daniel Cormier";
        //   console.log("lhw");
        // } else {
        //   firstName = t.first_name;
        // }
        if (t.weight_class === "Light_Heavyweight" && t.first_name === "To be determined...") {
          firstName = "Daniel Cormier";
        } else {
          firstName = t.first_name;
        }
        //If statement to determine if there is a title holder for that weight class
        if (t.last_name === null) {
          lastName = "";
        } else {
          lastName = t.last_name;
        }
        return <div key={t.id} className="list-item">
          <Link className="link" to={{pathname: "/fighter", state: {fighter: t} }}><p>{weightClass + ": " + firstName + " " + lastName}</p></Link>
        </div>
      })
    }
    return(
      <div className="info-item">
        <h3>Title Holders</h3>
          <div className="info-list info-side-list">
            <div className="title-holders">
              {titleHolders}
            </div>
            {this.handleLoading()}
          </div>
      </div>
    )
  }
}

export default TitleHolders;
