import { useState } from "react";
import { Input } from "@nextui-org/input";

export default function ModifyTask({ onModifyTodo, id }) {
  const [modifyTodoValue, setModifyTodoValue] = useState("");

  const modifyTodo = (e) => {
    setModifyTodoValue(e.target.value);
  };

  const handleModifySubmit = (e) => {
    e.preventDefault();
    if (modifyTodoValue.trim()) {
      onModifyTodo(modifyTodoValue, id);
      setModifyTodoValue("");
    }
  };
  return (
    <form onSubmit={handleModifySubmit}>
      <Input
        radius="full"
        size="lg"
        type="text"
        id={id}
        value={modifyTodoValue}
        onChange={modifyTodo}
      />
    </form>
  );
}
