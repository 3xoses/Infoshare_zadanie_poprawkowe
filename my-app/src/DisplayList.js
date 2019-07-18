import React from "react";
import DisplayItem from "./DisplayItem";

import "./main.css";

export default class DisplayList extends React.Component {
  render() {
    return (
      <ul id="todo-list">
        {this.props.todos.map((todo, i) => {
          return (
            <section id="main">
              <DisplayItem
                key={todo.id}
                todo={todo}
                handleDone={this.props.handleDone}
                handleDelete={this.props.handleDelete}
              />
            </section>
          );
        })}
      </ul>
    );
  }
}

const rootElement = document.getElementById("root");
