import './assets/styles/body.css'
import { AddTask } from "./components/form/AddTask";
import { useState } from "react";

function App() {

  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    const newTask = { id: Date.now(), text: task, isDone: false };
    setTasks([...tasks, newTask])
  }

  const deleteTasks = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const handleClick = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        if (task.isDone === true) {
          return { ...task, isDone: false }
        }
        return { ...task, isDone: true }
      }
      return task;
    })
    setTasks(updatedTasks)
  }

  return (
    <section>
      <div className="container my-5">
        <div className="row">
          <div className="col-12 text-center py-5">
            <h1 className="text-white">Ma Todo List</h1>
          </div>
          <div className="row justify-content-center">
            <div className="col-5">
              <AddTask onAddTask={addTask} />
            </div>
          </div>
          <div className="row">
            <div className="col-12 my-5">
              <ul className="text-white fw-bold">
                {tasks.map((task) =>
                  <li
                    className={task.isDone ? 'text-success' : null}
                    id={task.id}
                    key={task.id}
                    onClick={() => handleClick(task.id)}
                  >
                    {task.text}
                    <button
                      className="mx-2 btn btn-sm btn-danger"
                      id={task.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTasks(task.id)
                      }}>
                      x
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default App
