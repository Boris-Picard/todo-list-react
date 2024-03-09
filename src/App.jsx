import { AddTask } from "./components/form/AddTask";
import { useEffect, useState } from "react";
import ModifyTask from "./components/form/ModifyTask";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import ModalUpdate from "./components/form/ModalUpdate";

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
      ? "bg-gradient-to-l from-emerald-500 to-emerald-900"
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
      <div className="md: container md:mx-auto p-10">
        <h1 className="text-center text-6xl font-bold">ReactTasks</h1>
        <div className="flex justify-center my-12">
          <AddTask onAddTask={addTask} />
        </div>
        <div className="flex justify-center">
          <ButtonGroup>
            <Button
              radius="full"
              className={` font-bold ${isFilterActive("All")}`}
              onClick={getValue}
              value="All"
            >
              Toutes les tâches
            </Button>
            <Button
              radius="full"
              className={` font-bold ${isFilterActive("Active")}`}
              onClick={getValue}
              value="Active"
            >
              Tâches actives(non complétées)
            </Button>
            <Button
              radius="full"
              className={` font-bold ${isFilterActive("Completed")}`}
              onClick={getValue}
              value="Completed"
            >
              Tâches complétées
            </Button>
          </ButtonGroup>
        </div>
        <div className="grid grid-cols-4 gap-5 my-12">
          {filterTask(tasks).map((task) => (
            <div key={task.id} onClick={(e) => handleClick(task.id, e)}>
              <Card
                id={task.id}
                className={`h-full p-2 ${
                  task.isDone
                    ? "bg-gradient-to-tr from-emerald-500 to-emerald-900"
                    : null
                }`}
                onClick={(e) => handleClick(task.id, e)}
                shadow="sm"
              >
                <CardBody className="font-bold text-large">
                  {task.text}
                </CardBody>
                <CardFooter className="justify-between">
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
                      className="text-warning-400"
                      id={task.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleModify(task.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                      </svg>
                    </button>
                  )}
                  <button
                    id={task.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTasks(task.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-red-600"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default App;
