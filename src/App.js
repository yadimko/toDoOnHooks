import React, { useState } from 'react';
import TodoList from './TodoList';
import Footer from './Footer';

let id = 1;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = (event) => {
    if (event.key === 'Enter') {
      setTodos([
        ...todos,
        {
          id: id++,
          title: todoTitle,
          minutes: minutes || 0,
          seconds: seconds || 0,
          date: new Date(),
          completed: false,
          removed: false,
          editing: false,
        },
      ]);
      setTodoTitle('');
      setMinutes('');
      setSeconds('');
    }
  };

  const deleteToDo = (id) => {
    const idx = todos.findIndex((item) => item.id === id);
    const items = [...todos.slice(0, idx), ...todos.slice(idx + 1)];
    setTodos((todos) => {
      return [...items];
    });
  };

  const editToDo = (id, title) => {
    const idx = todos.findIndex((item) => item.id === id);
    const item = { ...todos[idx], title, editing: false };
    setTodos((todos) => {
      return [...todos.slice(0, idx), item, ...todos.slice(idx + 1)];
    });
  };

  const toggleClassName = (array, id, name) => {
    const idx = todos.findIndex((item) => item.id === id);
    const oldItem = array[idx];
    const value = !oldItem[name];

    const item = { ...array[idx], [name]: value };
    return [...array.slice(0, idx), item, ...array.slice(idx + 1)];
  };

  const toggleCompletedClass = (id) => {
    setTodos((todos) => {
      return toggleClassName(todos, id, 'completed');
    });
  };

  const toggleEditingClass = (id) => {
    setTodos((todos) => {
      return toggleClassName(todos, id, 'editing');
    });
  };

  const clearCompletedToDos = () => {
    const items = todos.filter((item) => !item.completed);
    setTodos(items);
  };

  const doneCount = todos.filter((item) => item.completed).length;
  const toDoCount = todos.length - doneCount;
  let visible;

  if (filter === 'active') {
    visible = todos.filter((item) => !item.completed);
  } else if (filter === 'completed') {
    visible = todos.filter((item) => item.completed);
  } else {
    visible = todos;
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onKeyPress={addTodo}>
          <input
            className="new-todo"
            placeholder="Task"
            value={todoTitle}
            onChange={(event) => setTodoTitle(event.target.value)}
            autoFocus
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            value={minutes}
            type="number"
            min="0"
            max="59"
            onChange={(event) => setMinutes(event.target.value)}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            type="number"
            value={seconds}
            min="0"
            max="59"
            onChange={(event) => setSeconds(event.target.value)}
          />
        </form>
      </header>
      <section className="main">
        <TodoList
          todos={visible}
          deleteToDo={deleteToDo}
          toggleCompletedClass={toggleCompletedClass}
          toggleEditingClass={toggleEditingClass}
          editToDo={editToDo}
        />
        <Footer clearCompletedToDos={clearCompletedToDos} setFilter={setFilter} toDoCount={toDoCount} />
      </section>
    </section>
  );
}
