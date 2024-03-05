export default function ModifyTask({
  handleModifySubmit,
  currentTodo,
  modifyTodo,
}) {
  return (
    <form onSubmit={handleModifySubmit}>
      <input
        className="form-control"
        type="text"
        value={currentTodo}
        placeholder={currentTodo}
        onChange={modifyTodo}
      />
    </form>
  );
}
