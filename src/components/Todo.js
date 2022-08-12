import "./Todo.css";
import PopUp from "./PopUp";
import { AiOutlineClose } from "react-icons/ai";
import React, { useState, useEffect } from "react";

function Todo({ todos, completeTodo, removeTodo }) {
  const [isOpen, setIsOpen] = useState({
    show: false,
    id: null,
  });

  useEffect(() => {
    const closePupup = (ev) => {
      if (
        ev.target.className === "popup-box" ||
        ev.target.innerText === "No" ||
        ev.target.innerText === "Yes"
      )
        setIsOpen(false);
    };

    document.body.addEventListener("click", closePupup);

    return () => document.body.removeEventListener("click", closePupup);
  }, []);

  const togglePopup = (todoId) => {
    setIsOpen({
      show: true,
      id: todoId,
    });
  };

  return todos.map((todo, index) => (
    <div
      className={todo.completed ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <div key={todo.id} className="todo-text">
        <input
          type="checkbox"
          onChange={() => completeTodo(todo.id)}
          className="checkbox"
          checked={todo.completed}
        ></input>
        <p style={{ wordBreak: "break-word" }}>{todo.text}</p>
      </div>

      <div className="icon">
        {isOpen.show && <PopUp removeTodo={removeTodo} id={isOpen.id} />}
        <AiOutlineClose
          onClick={() => togglePopup(todo.id)}
          className="delete-icon"
        />
      </div>
    </div>
  ));
}

export default Todo;
