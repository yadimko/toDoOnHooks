import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as fns from 'date-fns';

export default function TodoItem({
  id,
  title,
  completed,
  editing,
  deleteToDo,
  toggleCompletedClass,
  toggleEditingClass,
  editToDo,
  minutes,
  seconds,
  date,
}) {
  TodoItem.defaultProps = {
    minutes: '0',
    seconds: '0',
  };

  TodoItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    minutes: PropTypes.string,
    seconds: PropTypes.string,
    deleteToDo: PropTypes.func.isRequired,
    toggleCompletedClass: PropTypes.func.isRequired,
    toggleEditingClass: PropTypes.func.isRequired,
    editToDo: PropTypes.func.isRequired,
    date: PropTypes.string.isRequired,
  };

  let clName = '';
  if (completed && !editing) {
    clName += 'completed';
  }
  if (editing && !completed) {
    clName += 'editing';
  }

  const [editTodoTitle, setEditTodoTitle] = useState(title);
  const [itemDate, setItemDate] = useState(fns.formatDistanceToNow(date, { includeSeconds: true }));
  const [itemMinutes, setItemMinutes] = useState('');
  const [itemSeconds, setItemSeconds] = useState('');
  const [timer, setTimer] = useState(false);

  const timeTimer = () => {
    const min = Number(itemMinutes);
    const sec = Number(itemSeconds);

    if (sec === 0) {
      if (min === 0) {
        setItemMinutes('0');
        setItemSeconds('0');
        return;
      }
      setItemMinutes((itemMinutes) => {
        return itemMinutes - 1;
      });
      setItemSeconds((itemSeconds) => {
        return 60;
      });
    }
    setItemSeconds((itemSeconds) => {
      return itemSeconds - 1;
    });
  };

  useEffect(() => {
    if (minutes || seconds) {
      setTimer(true);
      minutes > 59 ? setItemMinutes('59') : setItemMinutes(minutes);
      seconds > 60 ? setItemSeconds('59') : setItemSeconds(seconds);
    }
  }, [minutes, seconds]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setItemDate(fns.formatDistanceToNow(date, { includeSeconds: true }));
      if (timer) {
        timeTimer();
      }
    }, 1000);
    return () => clearInterval(intervalID);
  });

  const editingToDoTitle = (event) => {
    if (event.key === 'Enter') {
      editToDo(id, editTodoTitle);
    }
  };

  const editField = editing ? (
    <input
      type="text"
      className="edit"
      value={editTodoTitle}
      onChange={(event) => setEditTodoTitle(event.target.value)}
      onKeyPress={editingToDoTitle}
    />
  ) : null;

  const formatMin = itemMinutes < 10 ? `0${itemMinutes}` : itemMinutes;
  const formatSec = itemSeconds < 10 ? `0${itemSeconds}` : itemSeconds;

  const time =
    itemMinutes || itemSeconds ? (
      <span className="description">
        <button
          className="icon icon-play"
          onClick={() => {
            setTimer(true);
          }}
          type="button"
        />
        <button
          className="icon icon-pause"
          onClick={() => {
            setTimer(false);
          }}
          type="button"
        />
        {formatMin}:{formatSec}
      </span>
    ) : null;

  return (
    <li className={clName}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => {
            toggleCompletedClass(id);
            setTimer(!timer);
          }}
        />
        <label>
          <span className="title">{title}</span>
          {time}
          <span className="description">{itemDate}</span>
        </label>
        <button className="icon icon-edit" onClick={() => toggleEditingClass(id)} type="button" />
        <button className="icon icon-destroy" onClick={() => deleteToDo(id)} type="button" />
      </div>
      {editField}
    </li>
  );
}
