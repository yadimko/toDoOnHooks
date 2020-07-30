import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

export default function TodoList({ todos, deleteToDo, toggleCompletedClass, toggleEditingClass, editToDo }) {
  TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    deleteToDo: PropTypes.func.isRequired,
    toggleCompletedClass: PropTypes.func.isRequired,
    toggleEditingClass: PropTypes.func.isRequired,
    editToDo: PropTypes.func.isRequired,
  };

  return (
    <ul className="todo-list">
      {todos.map((item) => (
        <TodoItem
          key={item.id}
          {...item}
          deleteToDo={deleteToDo}
          toggleCompletedClass={toggleCompletedClass}
          toggleEditingClass={toggleEditingClass}
          editToDo={editToDo}
        />
      ))}
    </ul>
  );
}
