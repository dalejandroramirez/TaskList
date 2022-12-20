import * as React from 'react'
import { useState } from 'react';

import useList from '../../hooks/useList';
import useConter from '../../hooks/useConter';

/**
 * Componente que gestiona la lista de tareas
 * 
 * @returns {React.Component} 
 */

const TaskList = () => {
  const tasks = useList([]);
  const numTasks = useConter(tasks.lenList);
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    tasks.push(newTask);
    numTasks.increment();
    setNewTask('');
  };

  /**
   * Añade una nueva tarea a la lista
   */
  const addNewTask = () => {
    tasks.push(newTask);
    numTasks.increment();
    setNewTask("")
  };

  /**
   * 
   * @param {*} e Evento de onChange 
   * @returns 
   */

  const editNewItem = (e) => setNewTask(e.target.value);

  /**
   * Agrega una nueva tarea cuando se presiona la tecla enter
   * @param {*} e - Evento onKeyDown que provenede por defecto de react 
   * @returns 
   */

  const insertNewItemOnEnterKey = (e) => e.key === "Enter" && addNewTask()

  return (
    <div>
      <h1>
        Task List
      </h1>
      {tasks.isEmpty()
        ? null
        : (
          <h3>
            Do you have
            {' '}
            {numTasks.value}
            {' '}
            Task
          </h3>
        )}

      <div onSubmit={handleSubmit}>
        <input
          value={newTask}
          onKeyDown={insertNewItemOnEnterKey}
          onChange={editNewItem}
          placeholder="New Task"
          type="text" />
        <button
          type="submit"
          onClick={addNewTask}> Create Task</button>
        {/* <button type="button" onClick={() => tasks.sortList(tasks)}>sort</button>
        <button type="button" onClick={() => tasks.reverseList(tasks)}>Reset</button> */}
      </div>



      {tasks.isEmpty()
        ? (<p>Task List is Empty</p>)
        : (
          <ul style={{ listStyle: 'none' }}>
            {tasks.value.map((task, index) => (
              <li key={index}>
                <input
                  onChange={() => { }}
                  type="checkbox"
                  onClick={() => {
                    numTasks.decrement();
                    tasks.remove(index);
                  }}
                  checked={false}
                />
                {task}
              </li>
            ))}
          </ul>
        )}
      <button type="button" onClick={() => tasks.removeList()}>Restar</button>
    </div>
  );
};

export default TaskList;