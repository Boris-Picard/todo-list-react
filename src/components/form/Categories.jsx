export function Categories() {


    const handleAdd = (e) => {
        e.target.value
    }

    return <div className="d-flex justify-content-center mt-5">
        <button className="btn btn-sm btn-light mx-3 fw-bold rounded-3 p-2" onClick={handleAdd}>
            Toutes les tâches
        </button>
        <button className="btn btn-sm btn-light mx-3 fw-bold rounded-3 p-2" onClick={handleAdd}>
            Tâches actives(non complétées)
        </button>
        <button className="btn btn-sm btn-light mx-3 fw-bold rounded-3 p-2" onClick={handleAdd}>
            Tâches complétées
        </button>
    </div>
}