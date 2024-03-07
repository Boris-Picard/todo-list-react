import { useState } from "react";

export default function ModifyTask({ onModifyTodo, id }) {
  const [modifyTodoValue, setModifyTodoValue] = useState("");

  const modifyTodo = (e) => {
    setModifyTodoValue(e.target.value);
  };

  const handleModifySubmit = (e) => {
    e.preventDefault();
    if (setModifyTodoValue) {
      onModifyTodo(setModifyTodoValue);
      setModifyTodoValue("");
    }
  };
  return (
    <form onSubmit={handleModifySubmit}>
      <input
        className="form-control"
        type="text"
        id={id}
        value={modifyTodoValue}
        onChange={modifyTodo}
      />
    </form>
  );
}
