// import { useState } from "react"

export function Categories() {

    // const [filter, setFilter] = useState([]);

    // const handleClick = (e) => {
    //     setFilter(e.target.value)
    // }

    return <div className="d-flex justify-content-center mt-5">
        <button className="btn btn-sm btn-light mx-3 fw-bold">
            Toutes les tâches
        </button>
        <button className="btn btn-sm btn-light mx-3 fw-bold">
            Tâches actives(non complétées)
        </button>
        <button className="btn btn-sm btn-light mx-3 fw-bold">
            Tâches complétées
        </button>
    </div>
}