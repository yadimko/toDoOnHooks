import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Footer({ clearCompletedToDos, setFilter, toDoCount }) {
  Footer.defaultProps = {
    toDoCount: 0,
  };

  Footer.propTypes = {
    toDoCount: PropTypes.number,
    clearCompletedToDos: PropTypes.func.isRequired,
    setFilter: PropTypes.func.isRequired,
  };

  const [b1, setB1] = useState('selected');
  const [b2, setB2] = useState('');
  const [b3, setB3] = useState('');

  return (
    <footer className="footer">
      <span className="todo-count">{toDoCount} items left</span>
      <ul className="filters">
        <li>
          <button
            type="button"
            className={b1}
            onClick={() => {
              setFilter('all');
              setB1('selected');
              setB2('');
              setB3('');
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={b2}
            onClick={() => {
              setFilter('active');
              setB1('');
              setB2('selected');
              setB3('');
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={b3}
            onClick={() => {
              setFilter('completed');
              setB1('');
              setB2('');
              setB3('selected');
            }}
          >
            Completed
          </button>
        </li>
      </ul>
      <button
        type="button"
        className="clear-completed"
        onClick={() => {
          clearCompletedToDos();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
}
