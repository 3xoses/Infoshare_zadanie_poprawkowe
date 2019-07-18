import React from "react";
import "./main.css";

class Popup extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup/_inner">
          <h1>{this.props.text}</h1>
          <button onClick={this.props.deleteCompleted}>USUŃ</button>
          <button onClick={this.props.closePopup}>ZAMKNIJ</button>
        </div>
      </div>
    );
  }
}

export default Popup;
