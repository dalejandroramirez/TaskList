import * as React from 'react'
import { useState } from 'react';

import useList from '../../hooks/useList';
import useConter from '../../hooks/useConter';
import { Task } from '../../models/task.model';
import { motion } from "framer-motion"


/**
 * Componente que gestiona la lista de tareas
 * 
 * @returns {React.Component} 
 */

const TaskList = ({ showSetting, setShowSetting }) => {

  const maxNumTask = 6

  const tasks = useList([]);
  const numTasks = useConter(tasks.lenList);
  const taskInit = new Task('', '', false)
  const [newTask, setNewTask] = useState(taskInit);


  /**
   * Añade una nueva tarea a la lista
   */
  const addNewTask = () => {
    if (newTask.name === "") return;
    tasks.push(newTask);
    numTasks.increment();
    setNewTask(taskInit)
  };

  /**
   * @param {*} e Evento de onChange 
   * @returns 
   */

  const editNewItem = (e) => {
    const task = new Task(e.target.value, "", false)
    setNewTask(task)
  }

  /**
   * Agrega una nueva tarea cuando se presiona la tecla enter
   * @param {*} e - Evento onKeyDown que provenede por defecto de react 
   * @returns 
   */

  const insertNewItemOnEnterKey = (e) => e.key === "Enter" && addNewTask()

  const taskCompleted = (task) => { !task.completed }

  return (
    <>
      <header className='flex justify-between'>
        <h1 className="text-3xl font-semibold text-sky-700 dark:text-sky-300">
          Task List
        </h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='btn'
          onClick={() => setShowSetting(!showSetting)}
        >{showSetting ? "Show Setting" : "Hide Setting"}
        </motion.button>
      </header>
      <div className='my-4'>
        {tasks.isEmpty()
          ? null
          : (
            <h3>
              {numTasks.value < 6 ? `Do you have ${numTasks.value} Task` : "Not more Tasks please :("}
            </h3>
          )}

        <div>
          <input
            className="shadow px-1 py-2 rounded-lg  hover:bg-sky-200 
          transition-all duration-300 focus:ring-2 mr-2
          dark:bg-slate-700"
            value={newTask.name}
            onKeyDown={insertNewItemOnEnterKey}
            onChange={editNewItem}
            placeholder="New Task"
            type="text" />
          <button
            className='btn'
            type="submit"
            onClick={addNewTask}> Create Task</button>
        </div>

        {tasks.isEmpty()
          ? (<p>Task List is Empty</p>)
          : (
            <ul style={{ listStyle: 'none' }}>
              {tasks.value.map((task, index) => (
                index < maxNumTask &&
                <motion.li
                  key={index}
                  style={{ listStyle: 'none' }}
                  initial={{ x: "20vw" }} animate={{ x: 0 }} transition={{duration: 0.7 }}
                >
                  <label>
                    <input
                      onChange={() => { }}
                      type="checkbox"
                      onClick={() => {
                        task.completed ? numTasks.increment() : numTasks.decrement()
                        task.completed = !task.completed
                        // tasks.remove(index);
                      }}
                      checked={taskCompleted(task)}
                    />
                    <span className={`ml-1 text-gray-800 dark:text-gray-100 text-sm italic
                      ${task.completed && "line-through"}`}>
                      {task.name}
                    </span>
                  </label>
                </motion.li>
              ))}
            </ul>
          )}

        <button type="button" onClick={() => {
          tasks.removeList()
          numTasks.setValue(0);
        }
        }>Restar
        </button>
      </div>
    </>);
};

export default TaskList;