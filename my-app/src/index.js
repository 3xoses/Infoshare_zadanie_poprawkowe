import React from "react";
import ReactDOM from "react-dom";
import DisplayList from "./DisplayList";
import "./main.css";
import Popup from "./popup";

const rand = require("random-key");

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      todos: [],
      show: false,
      showPopup: false
    };
  }
  handleDone(idToBeMarkedAsDone) {
    const _todos = this.state.todos;
    const todo = _todos.filter(todo => {
      return todo.id === idToBeMarkedAsDone;
    })[0];
    todo.done = !todo.done;
    this.setState({ todos: _todos });
  }

  handleDelete(idToBeDeleted) {
    var newTodos = this.state.todos.filter(todo => {
      return todo.id !== idToBeDeleted;
    });

    this.setState({ todos: newTodos });
  }

  handleSubmit(event) {
    event.preventDefault();
    const title = this.state.title;
    const newTodos = this.state.todos.concat({
      title: title,
      id: rand.generate(),
      done: false
    });
    this.setState({ title: "", todos: newTodos });
  }

  handleChange(event) {
    const title = event.target.value;
    this.setState({ title: title });
  }

  handleDeleteCompleted(event) {
    const newTodos = this.state.todos.filter(todo => {
      return !todo.done;
    });
    this.setState({ todos: newTodos });
  }

  handleDeleteAll(event) {
    const newTodos = this.state.todos.filter(todo => {
      return !todo.done;
    });
    this.setState({ todos: newTodos });
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <div>
        <h1>TODO</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            onChange={this.handleChange.bind(this)}
            value={this.state.title}
          />
          <button>Dodaj</button>
        </form>
        <DisplayList
          handleDone={this.handleDone.bind(this)}
          handleDelete={this.handleDelete.bind(this)}
          todos={this.state.todos}
        />
        <footer>
          Do realizacji: {this.state.todos.length} | Oczekujące:
          {
            this.state.todos.filter(todo => {
              return !todo.done;
            }).length
          }{" "}
          | Gotowe:
          {
            this.state.todos.filter(todo => {
              return todo.done;
            }).length
          }{" "}
          <div>
            <button onClick={this.togglePopup.bind(this)}>
              Usuń zaznaczone gotowe
            </button>
            {this.state.showPopup ? (
              <Popup
                text="Wciśnij USUŃ aby potwierdzić usunięcie zaznaczonych gotowych zadań.
                
                Wciśnij ZAMKNIJ aby wyjść."
                closePopup={this.togglePopup.bind(this)}
                deleteCompleted={this.handleDeleteCompleted.bind(this)}
              />
            ) : null}
          </div>
          <p style={{ fontSize: "10px" }}>
            <p>*edycja treści zadań wciśnij dwa razy przycisk myszy </p>
            <p style={{ marginTop: "-15px" }}>
              *potwierdzenie zmiany treści zadań wciśnij enter{" "}
            </p>
          </p>
        </footer>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
