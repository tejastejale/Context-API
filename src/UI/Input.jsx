import React from "react";

export default function Input({id, label, ...props}) {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} {...props} required></input>
    </p>
  );
}
