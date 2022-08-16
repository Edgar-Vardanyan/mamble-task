import "./TodoList.css";
import Todo from "./Todo";
import PopUp from "./PopUp";
import TodoForm from "./TodoForm";
import React, { useState, useEffect } from "react";
import axios from "axios";

function TodoList() {
  const [showCompleted, setShowCompleted] = useState(
    JSON.parse(localStorage.getItem("showCompleted"))
  );
  const [data, setData] = useState([]);
  const [optionsData, setOptionsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState({
    show: false,
    id: null,
  });

  const todoList = !loading ? data : [];

  useEffect(() => {
    fetchData();
    fetchOptionsData()

    const closePupup = (ev) => {
      if (
        ev.target.className === "popup-box" ||
        ev.target.innerText === "No" ||
        ev.target.innerText === "Yes"
      )
        setIsOpen(false);
      return {
        data,
        loading,
      };
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

  const fetchOptionsData = async () => {
    const checkBox = document.querySelector('input')
    try {
      const { data: response } = await axios.get(
        "http://localhost:8080/api/options"
      );
      setOptionsData(response.data);
      setShowCompleted(response.data[0]['showCompleted'])
      checkBox.checked = response.data[0]['showCompleted']
    } catch (error) {
      console.error(error);
    }
    
    
  };

  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        "http://localhost:8080/api/todos"
      );
      setData(response.data.reverse());
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const addTodo = async (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    await axios
      .post("http://localhost:8080/api/todos", {
        text: todo.text,
        completed: todo.completed,
      })
      .catch((error) => {
        console.log(error);
      });

    fetchData();
  };

  const completeTodo = async (id) => {
    const completedTodo = todoList.filter((todo) => todo._id === id);

    await axios.put(`http://localhost:8080/api/todos/${id}`, {
      text: completedTodo[0]["text"],
      completed: !completedTodo[0]["completed"],
    });
    fetchData();
  };

  const removeTodo = async (id) => {
    await axios.delete(`http://localhost:8080/api/todos/${id}`);
    fetchData();
  };

  const handleShowCompleted = async () => {
    
    await axios.put(`http://localhost:8080/api/options/${optionsData[0]["_id"]}`,{"showCompleted" : !optionsData[0]["showCompleted"]})
    fetchOptionsData()
    setShowCompleted(!optionsData[0]["showCompleted"]);
  };
  
  return (
    <div className="wrapper">
      <div className="popup-wrapper">
        {isOpen.show && <PopUp removeTodo={removeTodo} id={isOpen.id} />}
      </div>
      <div className={todoList.length ? "hide-completed" : "show-none"}>
        <input
          type="checkbox"
          onClick={() => handleShowCompleted()}
        ></input>
        Hide Completed
      </div>
      <TodoForm onSubmit={addTodo} todos={todoList} />
      {!showCompleted && (
        <div className="todo-wrapper">
          <Todo
            todos={todoList}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            togglePopup={togglePopup}
          />
        </div>
      )}
      {showCompleted && (
        <div className="todo-wrapper">
          <Todo
            todos={todoList.filter((todo) => !todo.completed)}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        </div>
      )}
      {!todoList.length && !loading && (
        <div className="empty-todo-text">
          <h2>your life is a blank page. You write on it.</h2>
          <h1>So start by adding your tasks here.</h1>
        </div>
      )}
    </div>
  );
}

export default TodoList;
