import React from "react";
import "./main.css";

export default class DispalItem extends React.Component {
  constructor() {
    super();
    this.state = { editing: false };
  }

  componentDidMount() {
    this.setState({ changedText: this.props.todo.title });
  }

  handleEditing(event) {
    this.setState({ editing: true, changedText: this.props.todo.title });
  }

  handleEditingDone(event) {
    if (event.keyCode === 13) {
      this.setState({ editing: false });
    }
  }

  handleEditingChange(event) {
    const changedText = event.target.value;
    this.setState({ changedText: changedText });
  }

  render() {
    const todo = this.props.todo;
    const title = todo.title;
    const viewStyle = {};
    const editStyle = {};

    if (this.state.editing) {
      viewStyle.display = "none";
    } else {
      editStyle.display = "none";
    }

    return (
      <li className={todo.done ? "done" : ""}>
        <div style={viewStyle} onDoubleClick={this.handleEditing.bind(this)}>
          <input
            checked={todo.done}
            onChange={this.props.handleDone.bind(null, todo.id)}
            type="checkbox"
          />
          <label>{this.state.changedText}</label>
          <button
            className="destroy"
            onClick={this.props.handleDelete.bind(null, todo.id)}
            style={{ width: "100px" }}
          >
            Usuń
          </button>
        </div>
        <input
          type="text"
          onKeyDown={this.handleEditingDone.bind(this)}
          onChange={this.handleEditingChange.bind(this)}
          style={editStyle}
          value={this.state.changedText}
        />
      </li>
    );
  }
}
