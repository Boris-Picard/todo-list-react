import { AddTask } from "./components/form/AddTask";
import './assets/styles/body.css'
import { useState } from "react";

function App() {

  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    const newTask = { id: Date.now(), text: task };
    setTasks([...tasks, newTask])
  }

  const deleteTasks = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  return (
    <section>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 text-center py-5">
            <h1 className="text-white">Ma Todo List</h1>
          </div>
          <div className="col-5">
            <AddTask onAddTask={addTask} />
          </div>
          <div className="col-12 my-5">
            <ul className="text-white">
              {tasks.map((task) =>
                <li
                  className="text-white my-3"
                  id={task.id}
                  key={task.id}>
                  {task.text}
                  <button
                    className="mx-2 btn btn-sm btn-danger"
                    id={task.id}
                    onClick={() => deleteTasks(task.id)}>
                    x
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default App
