import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="10" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-success">
      {props.children}
    </button>
  );
}

export function SelectTag(props) {
  return (
    <div className="form-group">
      <label htmlFor="feature">Select Feature:</label>
      <select className="custom-select" id="feature" {...props}>
        <option defaultValue> -- select an option -- </option>
        <option value="water" >Water fountain</option>
        <option value="bathroom" >Bathroom</option>
        <option value="bicycle">Bicycle rack</option>
      </select>
    </div>
  );
}


