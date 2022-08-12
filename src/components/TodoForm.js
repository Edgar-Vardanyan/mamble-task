import "./TodoForm.css";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function TodoForm(props) {
  const [input, setInput] = useState("");
  const [errorState, setErrorState] = useState(false);

  const handleInput = (ev) => {
    if (ev.target.value.length > 54) {
      setErrorState(true);
    } else setErrorState(false);
    setInput(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 1000),
      text: input,
      completed: false,
    });

    setInput("");
  };

  return (
    <div className="form-wrapper">
      <form className="todo-form" onSubmit={handleSubmit}>
        <h2 className="todo-input-header">Task</h2>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Write here"
            value={input}
            name="text"
            className={errorState ? "todo-input input-error" : "todo-input"}
            onChange={handleInput}
          ></input>
          {input && (
            <AiOutlineClose
              onClick={() => {
                setInput("");
                setErrorState(false);
              }}
              className="clear-text"
            />
          )}

          <button className="todo-button" disabled={errorState}>
            Add
          </button>
        </div>
      </form>
      {errorState && (
        <p className="error">Task content can contain max 54 characters.</p>
      )}
    </div>
  );
}

export default TodoForm;
