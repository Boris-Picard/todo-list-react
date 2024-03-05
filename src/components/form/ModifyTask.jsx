import { useState } from "react";

export function ModifyTask({ onModifyTask }) {
  const [currentTodo, setCurrentTodo] = useState([]);

  const handleModify = (e) => {
    setCurrentTodo(e.target.value);
  };

  const handleModifySubmit = (e) => {
    e.preventDefault();
    // if (currentTodo) {
    onModifyTask(currentTodo);
    //   setCurrentTodo("");
    // }
  };

  return (
    <form onSubmit={handleModifySubmit}>
      <input
        className="form-control"
        type="text"
        value={currentTodo}
        placeholder={currentTodo.text}
        onChange={handleModify}
      />
    </form>
  );
}
