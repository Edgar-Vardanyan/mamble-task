import "./Todo.css";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

function Todo({ todos, completeTodo, removeTodo, togglePopup }) {
  return todos.map((todo, index) => (
    <div
      className={todo.completed ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <div key={todo.id} className="todo-text">
        <input
          type="checkbox"
          onChange={() => completeTodo(todo._id)}
          className="checkbox"
          checked={todo.completed}
        ></input>
        <p style={{ wordBreak: "break-word" }}>{todo.text}</p>
      </div>

      <div className="icon">
        <AiOutlineClose
          onClick={() => togglePopup(todo._id)}
          className="delete-icon"
        />
      </div>
    </div>
  ));
}

export default Todo;
