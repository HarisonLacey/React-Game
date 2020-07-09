import React from "react";
import backCard from "./poker.png";

// This is a component that contains the template for the back of the card image

class CardBack extends React.Component {
  render() {
    return <img src={backCard} alt="back_card"></img>;
  }
}

export default CardBack;
