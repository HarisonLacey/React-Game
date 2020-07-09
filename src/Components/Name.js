import React from "react";

// This is a component that contains the green score split box

class Name extends React.Component {
  render() {
    return (
      <div>
        <h2 className="menu">{this.props.total} / {this.props.optotal}</h2>
      </div>
    );
  }
}

export default Name;