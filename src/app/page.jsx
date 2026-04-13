"use client";

import { useState } from "react";

export default function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");
  const inputHandleChange = (e) => setInputValue(e.target.value);

  const onAddTodo = () => {
    if (!inputValue.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      checked: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const deleteTodo = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const onToggleCheckbox = (todoId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  };

  const clearAll = () => setTodos([]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") return !todo.checked;
    if (filter === "Completed") return todo.checked;
    return true;
  });

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-4">To-do list</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={inputHandleChange}
          placeholder="Add a task?"
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring"
        />
        <button
          onClick={onAddTodo}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <div className="flex justify-center gap-4 mb-4 text-sm font-medium">
        {["All", "Active", "Completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full ${
              filter === f
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center px-3 py-2 border rounded"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => onToggleCheckbox(todo.id)}
                className="h-4 w-4 text-blue-600"
              />
              <span
                className={`${
                  todo.checked ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
        {filteredTodos.length === 0 && (
          <p className="text-center text-gray-500 text-sm">No task add one.</p>
        )}
      </div>

      {todos.length > 0 && (
        <div className="flex justify-end mt-4">
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
