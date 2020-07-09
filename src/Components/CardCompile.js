import React from "react";

// Components

import CardBack from "./CardBack";
import CardFront from "./CardFront";
import Name from "./Name";

// Boostrap styling

import Button from "react-bootstrap/Button";

// Array of card numbers

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

// This class below is where all components are compiled, calculated and then rendered

class CardCompile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      opCards: [],
      value: [numbers[Math.floor(Math.random() * 13)]],
      opValue: [numbers[Math.floor(Math.random() * 13)]],
      display: [],
      opDisplay: [],
      total: "",
      opTotal: "",
    };

    // Ref hooks

    this.hit = React.createRef();
    this.look = React.createRef();
    this.reset = React.createRef();
    this.bottomMar = React.createRef();
    this.helper = React.createRef();
  }

  // Function that maps and then displays your cards

  display() {
    return this.state.cards.map((e) => e);
  }

  // Function that maps and then displays opponent's cards

  opDisplay() {
    return this.state.opCards.map((e) => e);
  }

  // When the 'Hit Me' button is clicked the set function below is initiated in which the state is modified

  set = () =>
    this.setState({
      cards: this.state.cards.concat([<CardBack />]),
      opCards: this.state.opCards.concat([<CardBack />]),
      value: this.state.value.concat(numbers[Math.floor(Math.random() * 13)]),
      opValue: this.state.opValue.concat(
        numbers[Math.floor(Math.random() * 13)]
      ),
      display: this.state.display.concat([
        <CardFront display={this.state.value.pop()} />,
      ]),
      opDisplay: this.state.opDisplay.concat([
        <CardFront display={this.state.opValue.pop()} />,
      ]),
    });

  // This function controls which buttons should display

  buttons() {
    this.look.current.style.display = "none";
    this.hit.current.style.display = "none";
    this.reset.current.style.display = "inline";
  }

  // This function is called when you click 'Show'.
  // The state is updated in order the display the totals and front of the cards

  show = () =>
    this.setState({
      cards: this.state.display,
      opCards: this.state.opDisplay,
      total: eval(this.state.value.join("+")) - this.state.value.pop(),
      opTotal: eval(this.state.opValue.join("+")) - this.state.opValue.pop(),
    });

  // Displays your total

  total() {
    return "Your Selection | " + this.state.total;
  }

  // Displays opponent's total

  opTotal() {
    return "Opponent Selection | " + this.state.opTotal;
  }

  // This function controls which buttons should display

  buttonShow() {
    this.look.current.style.display = "inline";
    this.hit.current.style.display = "inline";
    this.reset.current.style.display = "none";
  }

  // This function is called when the 'Reset' button is clicked.
  // The state is reset to original state

  resetGame = () =>
    this.setState({
      cards: [],
      opCards: [],
      value: [numbers[Math.floor(Math.random() * 13)]],
      opValue: [numbers[Math.floor(Math.random() * 13)]],
      display: [],
      opDisplay: [],
      total: "",
      opTotal: "",
    });

  // This function is called when 'Help Me' is clicked and displays the rules of the game

  help() {
    this.helper.current.style.visibility = "visible";
  }

  // This function determines who has won or whether there is a tie

  win() {
    let total = this.state.total;
    let opTotal = this.state.opTotal;
    if (total > opTotal && total <= 21) {
      return "You Win!";
    } else if (total === "" && opTotal === "") {
      return "Select A Card!";
    } else if (total > 21 && opTotal > 21) {
      return "Try Again!";
    } else if (total < opTotal && opTotal <= 21) {
      return "You Lose!";
    } else if (total <= 21 && opTotal > 21) {
      return "You Win!";
    } else if (total > 21 && opTotal <= 21) {
      return "You Lose!";
    } else if (
      total === opTotal &&
      total <= 21 &&
      opTotal <= 21 &&
      total !== 0 &&
      opTotal !== 0
    ) {
      return "Tie!";
    } else if (total === 0 && opTotal === 0) {
      return "Select A Card!";
    }
  }

  // Here all the elements are rendered

  render() {
    return (
      <div>
        <div className="height">{this.display()}</div>
        <div className="text">
          <Button
            className="button leftButton"
            variant="outline-danger"
            size="sm"
            ref={this.hit}
            onClick={this.set}
          >
            Hit Me
          </Button>
          <Button
            className="button"
            variant="outline-danger"
            size="sm"
            ref={this.look}
            onClick={() => {
              this.show();
              this.buttons();
            }}
          >
            Show
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => {
              this.resetGame();
              this.buttonShow();
            }}
            className="reset"
            ref={this.reset}
          >
            Reset
          </Button>

          <Button
            className="button"
            variant="outline-danger"
            size="sm"
            onClick={() => {
              this.help();
            }}
          >
            Help
          </Button>
          <div className="top">
            <h2>{this.total()}</h2>
            <h2>{this.opTotal()}</h2>
            <h2>{this.win()}</h2>
          </div>
        </div>
        <div ref={this.helper} className="help">
          <p>
            This is a simple variation of the game 21.
            <br />
            The object of the game is to get your cards to add up to 21 or as
            close as possible.
            <br />
            Click 'Hit Me' to get dealt a hidden card.
            <br />
            Click 'Show' to view your selection as well as your opponent's
            selection.
          </p>
        </div>
        <Name total={this.state.total} optotal={this.state.opTotal} />
        <div className="height2">{this.opDisplay()}</div>
      </div>
    );
  }
}

export default CardCompile;
