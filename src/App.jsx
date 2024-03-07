import "./assets/styles/body.css";
import { AddTask } from "./components/form/AddTask";
import { useState } from "react";
import ModifyTask from "./components/form/ModifyTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTask, setFilteredTask] = useState("All");
  const [isEditing, setIsEditing] = useState(false);

  const addTask = (task) => {
    const newTask = { id: Date.now(), text: task, isDone: false };
    setTasks([...tasks, newTask]);
  };

  const deleteTasks = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleClick = (id) => {
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
      const modifyTaskClick = tasks.map((task) => {
        if (task.id === id) {
          setIsEditing(true);
        }
      });
      return modifyTaskClick;
    }
  };

  const modifyTodo = (e, id) => {
    const modifyTask = tasks.map((task) => {
      if (task.id === id) {
        return task;
      }
      console.log(task);
      return task;
    });
    return setTasks(modifyTask);
  };
  return (
    <section>
      <div className="container my-5">
        <div className="row">
          <div className="col-12 text-center py-5">
            <h1 className="text-white">Ma Todo List</h1>
          </div>
          <div className="row justify-content-center">
            <div className="col-6">
              <AddTask onAddTask={addTask} />
            </div>
          </div>
          <div className="row text-center mt-5">
            <div className="col-12">
              <button
                className="btn btn-sm btn-light mx-3 fw-bold rounded-3 p-2"
                onClick={getValue}
                value="All"
              >
                Toutes les tâches
              </button>
              <button
                className="btn btn-sm btn-light mx-3 fw-bold rounded-3 p-2"
                onClick={getValue}
                value="Active"
              >
                Tâches actives(non complétées)
              </button>
              <button
                className="btn btn-sm btn-light mx-3 fw-bold rounded-3 p-2"
                onClick={getValue}
                value="Completed"
              >
                Tâches complétées
              </button>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-8 my-5">
              {filterTask(tasks).map((task) => (
                <div
                  className={`hstack mb-3 card bg-light ${
                    task.isDone ? "text-decoration-line-through" : null
                  }`}
                  id={task.id}
                  key={task.id}
                  onClick={() => handleClick(task.id)}
                >
                  <div className="card-body fw-bold">{task.text}</div>
                  {isEditing ? (
                    <ModifyTask
                      key={task.id}
                      id={task.id}
                      onModifyTodo={() => modifyTodo(task.id)}
                      value={task}
                    />
                  ) : (
                    <button
                      className="btn btn-sm btn-dark"
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
                    className="mx-2 btn btn-sm btn-danger"
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
        </div>
      </div>
    </section>
  );
}

export default App;
