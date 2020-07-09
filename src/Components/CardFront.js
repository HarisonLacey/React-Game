import React from "react";
import frontCard from "./front.png";

// This is a component that contains the template for the front of the card image

class CardFront extends React.Component {
  render() {
    return (
      <div className="container">
        <img className="card" src={frontCard} alt="front_card" />
        <p className="number">{this.props.display}</p>
        <p className="number1">{this.props.display}</p>
      </div>
    );
  }
}

export default CardFront;
