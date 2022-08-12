import "./PopUp.css";
import React from "react";

function PopUp({ removeTodo, id }) {
  return (
    <div className="popup-box">
      <div className="box">
        <div className="box-text">Are you sure you want to delete?</div>
        <div className="buttons">
          <button className="box-button" onClick={() => removeTodo(id)}>
            Yes
          </button>
          <button className="box-button">No</button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
