import React, { useState} from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Modal from './Modal.tsx'; 

export const Todo = ({ task, deleteTodo, editTodo,toggleComplete }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    deleteTodo(task.id); 
    setIsModalOpen(false); 
  };

  return (
    <div className='Todo'>
      <div 
        onClick={() => toggleComplete(task.id)}
        style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
      >
        {task.task}
      </div>
      <div>
        <MdDriveFileRenameOutline size='24' color="white" onClick={() => editTodo(task.id)} />
        <FaTrashAlt size="24" color="white" onClick={() => setIsModalOpen(true)} />
      </div>

      {isModalOpen && (
        <Modal
          onConfirm={handleDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};



