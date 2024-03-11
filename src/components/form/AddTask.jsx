import { useState } from "react";
import { Input } from "@nextui-org/input";

export function AddTask({ onAddTask, className }) {
  const [list, setList] = useState("");

  const handleChange = (e) => {
    setList(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (list) {
      onAddTask(list);
      setList("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        size="lg"
        type="text"
        value={list}
        placeholder="Add a task"
        onChange={handleChange}
        className={className}
      />
    </form>
  );
}
