export function Categories() {


    const getValue = (e) => {
        e.target.value
    }

    return <div className="d-flex justify-content-center mt-5">
        <button 
        className="btn btn-sm btn-light mx-3 fw-bold rounded-3 p-2" 
        onClick={getValue}
        value="All">
            Toutes les tâches
        </button>
        <button 
        className="btn btn-sm btn-light mx-3 fw-bold rounded-3 p-2" 
        onClick={getValue}
        value="Active">
            Tâches actives(non complétées)
        </button>
        <button 
        className="btn btn-sm btn-light mx-3 fw-bold rounded-3 p-2" 
        onClick={getValue}
        value="Completed">
            Tâches complétées
        </button>
    </div>
}