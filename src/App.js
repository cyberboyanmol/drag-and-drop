import React from "react";
import "./App.scss";
import Todo from "./components/TodoMain/Todo";
const App = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
        Drag And Drop Todo
      </h1>
      <Todo />
    </div>
  );
};

export default App;
