import "./TodoList.css";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import React, { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(
    JSON.parse(localStorage.getItem("showCompleted"))
  );
  const todoList = JSON.parse(localStorage.getItem("Todos"))
    ? JSON.parse(localStorage.getItem("Todos"))
    : todos;

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todoList];

    localStorage.setItem("Todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const completeTodo = (id) => {
    let updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const removeTodo = (id) => {
    const removeArr = todoList.filter((todo) => todo.id !== id);
    localStorage.setItem("Todos", JSON.stringify(removeArr));

    setTodos(removeArr);
  };

  const handleShowCompleted = () => {
    localStorage.setItem("showCompleted", JSON.stringify(!showCompleted));
    setShowCompleted(JSON.parse(localStorage.getItem("showCompleted")));
  };

  return (
    <div className="wrapper">
      <div className={todoList.length ? "hide-completed" : "show-none"}>
        <input
          type="checkbox"
          onChange={() => handleShowCompleted()}
          checked={JSON.parse(localStorage.getItem("showCompleted"))}
        ></input>
        Hide Completed
      </div>
      <TodoForm onSubmit={addTodo} todos={todoList} />
      {!JSON.parse(localStorage.getItem("showCompleted")) && (
        <div className="todo-wrapper">
          <Todo
            todos={todoList}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        </div>
      )}
      {JSON.parse(localStorage.getItem("showCompleted")) && (
        <div className="todo-wrapper">
          <Todo
            todos={todoList.filter((todo) => !todo.completed)}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        </div>
      )}
      {!todoList.length && (
        <div className="empty-todo-text">
          <h2>your life is a blank page. You write on it.</h2>
          <h1>So start by adding your tasks here.</h1>
        </div>
      )}
    </div>
  );
}

export default TodoList;
