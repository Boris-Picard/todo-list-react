import { AddTask } from "./components/form/AddTask";
import { useEffect, useState } from "react";
import ModifyTask from "./components/form/ModifyTask";
import { Button, ButtonGroup } from "@nextui-org/button";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTask, setFilteredTask] = useState("All");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("ToDo"));
    if (tasks) {
      setTasks(tasks);
    }
  }, []);

  const addTask = (task) => {
    const newTask = { id: Date.now(), text: task, isDone: false };
    setTasks([...tasks, newTask]);
  };

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("ToDo", JSON.stringify(tasks));
    }
  }, [tasks]);

  const deleteTasks = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("ToDo", JSON.stringify(updatedTasks));
  };

  const handleClick = (id, e) => {
    if (e.target.tagName.toLowerCase() === "input") {
      return;
    }
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        if (task.isDone === true) {
          return { ...task, isDone: false };
        }
        return { ...task, isDone: true };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const getValue = (e) => {
    setFilteredTask(e.target.value);
    setActiveFilter(e.target.value);
  };

  const isFilterActive = (filter) => {
    return activeFilter === filter
      ? "bg-gradient-to-tr from-pink-500 to-yellow-500"
      : "";
  };

  const filterTask = (tasks) => {
    switch (filteredTask) {
      case "All":
        return tasks;
      case "Active":
        return tasks.filter((task) => task.isDone === false);
      case "Completed":
        return tasks.filter((task) => task.isDone === true);
      default:
        break;
    }
  };

  const handleModify = (id) => {
    {
      setEditingTaskId(id);
    }
  };

  const handFinishEditing = () => {
    setEditingTaskId(null);
  };

  const modifyTodo = (id, newValue) => {
    const modifyTask = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, text: newValue };
      }
      return task;
    });
    return setTasks(modifyTask);
  };
  return (
    <section>
      <div className="container-lg flex-auto">
        <h1 className="text-center text-6xl">ReactTasks</h1>
        <div className="flex justify-center my-12">
          <AddTask onAddTask={addTask} />
        </div>
        <div className="flex justify-center">
          <ButtonGroup>
            <Button
              className={`${isFilterActive("All")}`}
              onClick={getValue}
              value="All"
            >
              Toutes les tâches
            </Button>
            <Button
              className={`${isFilterActive("Active")}`}
              onClick={getValue}
              value="Active"
            >
              Tâches actives(non complétées)
            </Button>
            <Button
              className={`${isFilterActive("Completed")}`}
              onClick={getValue}
              value="Completed"
            >
              Tâches complétées
            </Button>
          </ButtonGroup>
        </div>
        <div className="flex my-12">
          {filterTask(tasks).map((task) => (
            <div
              className={`${
                task.isDone ? "text-decoration-line-through" : null
              }`}
              id={task.id}
              key={task.id}
              onClick={(e) => handleClick(task.id, e)}
            >
              <div className="">{task.text}</div>
              {editingTaskId === task.id ? (
                <ModifyTask
                  key={task.id}
                  id={task.id}
                  onModifyTodo={(newValue) => {
                    modifyTodo(task.id, newValue);
                    handFinishEditing();
                  }}
                />
              ) : (
                <button
                  className=""
                  id={task.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModify(task.id);
                  }}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
              )}
              <button
                className=""
                id={task.id}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTasks(task.id);
                }}
              >
                <i className="bi bi-trash-fill mx-2"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default App;
