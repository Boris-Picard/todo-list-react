import { List } from "./components/todo/List";
import { AddTask } from "./components/form/AddTask";
import './assets/styles/body.css'

function App() {

  return (
    <section>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-5">
            <AddTask />
          </div>
          <div className="col-12 my-5">
            <List />
          </div>
        </div>
      </div>
    </section>
  )
}

export default App
