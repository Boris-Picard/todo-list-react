import { AddTask } from "./components/form/AddTask";
import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import ModalUpdate from "./components/form/ModalUpdate";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTask, setFilteredTask] = useState("All");
  const [activeFilter, setActiveFilter] = useState("All");
  const [darkMode, setDarkMode] = useState();

  const handleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("DarkMode", JSON.stringify(newDarkMode));
  };

  useEffect(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem("DarkMode"));
    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode);
    }
  }, []);

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
    if (
      e.target.tagName.toLowerCase() === "input" ||
      e.target.tagName.toLowerCase() === "header" ||
      e.target.tagName.toLowerCase() === "footer" ||
      e.target.id.toLowerCase() === ":rh:" ||
      e.target.id.toLowerCase() === ":rc3:"
    ) {
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
      ? "bg-gradient-to-l from-emerald-500 to-emerald-900 text-white"
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
    <section className={`min-h-screen ${darkMode ? "bg-black dark" : null} `}>
      <div className="md:container md:mx-auto p-10">
        <div className="grid grid-cols-3 items-center">
          <div></div>
          <h1
            className={`col-span-1 text-center text-6xl font-bold ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            ReactTasks
          </h1>
          <div className="col-span-1 flex justify-end">
            {darkMode ? (
              <Button onClick={handleDarkMode}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  color="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
              </Button>
            ) : (
              <div>
                <Button onClick={handleDarkMode}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    color="white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="my-12 w-96">
            <AddTask onAddTask={addTask} />
          </div>
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
        <div className="grid grid-cols-4 gap-5 my-12" id="card">
          {filterTask(tasks).map((task) => (
            <div key={task.id} onClick={(e) => handleClick(task.id, e)}>
              <Card
                id={task.id}
                className={`h-full p-2 ${
                  task.isDone
                    ? "bg-gradient-to-tr from-emerald-500 to-emerald-900 text-white"
                    : null
                }`}
                onClick={(e) => handleClick(task.id, e)}
                shadow="lg"
              >
                <CardBody className="font-bold text-large h-48">
                  {task.text}
                </CardBody>
                <CardFooter className="justify-between">
                  <ModalUpdate
                    onModifyTodo={(newValue) => {
                      modifyTodo(task.id, newValue);
                    }}
                    defaultValue={task.text}
                  />
                  <Button
                    color="danger"
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
                      className="w-6 h-6 text-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
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
