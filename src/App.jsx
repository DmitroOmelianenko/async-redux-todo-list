
import { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";

import { addTodo, deleteTodo, editTodo } from "./redux/todosSlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const [search, setSearch] = useState("");

  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();

    const text = e.target.elements.newTodo.value;

    if (!text.trim()) return;

    dispatch(addTodo({
      id: nanoid(),
      text: text.trim()
    }));

    e.target.reset();
  };

  const handleDelete = (todoId) => {
    dispatch(deleteTodo(todoId));
  };

  const handleEdit = (todo, e) => {
    const input = e.currentTarget.parentElement.querySelector(".editInput");
    const newText = input.value;

    if (!newText.trim()) return;

    dispatch(editTodo({
      id: todo.id,
      text: newText.trim()
    }));
  };

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h2>ToDo List</h2>

      <input
        type="text"
        placeholder="Пошук..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form onSubmit={handleAdd}>
        <input
          type="text"
          name="newTodo"
          placeholder="Введіть задачу..."
        />

        <button type="submit">Додати</button>
      </form>

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id} id={todo.id}>
            <span>{todo.text}</span>

            <button
              type="button"
              onClick={() => handleDelete(todo.id)}
            >
              Видалити
            </button>

            <button
              className="editButton"
              type="button"
              onClick={(e) => handleEdit(todo, e)}
            >
              Редагувати
            </button>

            <input
              type="text"
              className="editInput"
              defaultValue={todo.text}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
