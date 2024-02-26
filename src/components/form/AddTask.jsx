import { useState } from "react"

export function AddTask() {

    const [list, setList] = useState("")

    const handleChange = (e) => {
        setList(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (SubmitEvent) {
            setList("")
        }
    }

    return <form onSubmit={handleSubmit}>
        <input
            className="form-control"
            type="text"
            value={list}
            placeholder="Ajouter une tâche"
            onChange={handleChange}
        />
    </form>
}