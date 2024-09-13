import React, {useState, useEffect} from 'react'
import { TodoForm } from './TodoForm';
import { v4 as uuidv4} from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './TodoEdit';
uuidv4();

const FILTERS = {
  ALL: 'ALL',
  COMPLETED: 'COMPLETED',
  UNCOMPLETED: 'UNCOMPLETED',
};
const SORT_OPTIONS = {
  DATE: 'DATE',
  STATUS: 'STATUS',
};

export const TodoWrapper = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [sortOption, setSortOption] = useState(SORT_OPTIONS.DATE);
  const completedCount = todos.filter(todo => todo.completed).length;
  const uncompletedCount = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  const addTodo = todo => {
    setTodos([{ id: uuidv4(), task: todo, completed: false, isEditing: false, createdAt: new Date() }, ...todos]);
  };
  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
    
  }
  const editTodo = id =>{
    setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
    
  }
  const editTask = (task, id) =>{
    setTodos(todos.map(todo => todo.id === id ? {...todo,task, isEditing: !todo.isEditing} : todo))
    
  }
  const toggleComplete = id => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    
  }
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    
  };
  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
    
  };
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case FILTERS.COMPLETED:
        return todo.completed;
      case FILTERS.UNCOMPLETED:
        return !todo.completed;
      default:
        return true; 
    }
  });

  const sortedTodos = filteredTodos.sort((a, b) => {
    switch (sortOption) {
      case SORT_OPTIONS.DATE:
        return new Date(a.createdAt) - new Date(b.createdAt);
      case SORT_OPTIONS.STATUS:
        return a.completed - b.completed;
      default:
        return 0;
    }
  });

  return (
    <div className='TodoWrapper'>
    <h1>PLANNER</h1>
      <div className='header'>
        <TodoForm addTodo={addTodo} />
        <div className='sort-buttons'>
          <button onClick={() => handleSortChange(SORT_OPTIONS.DATE)}>Sort by Date</button>
          <button onClick={() => handleSortChange(SORT_OPTIONS.STATUS)}>Sort by Status</button>
        </div>
      </div>
      <div className="task-counter">
        <p>Completed Tasks: {completedCount}</p>
        <p>Uncompleted Tasks: {uncompletedCount}</p>
      </div>
      <div className='filter-buttons'>
        <button onClick={() => handleFilterChange(FILTERS.ALL)}>All</button>
        <button onClick={() => handleFilterChange(FILTERS.COMPLETED)}>Completed</button>
        <button onClick={() => handleFilterChange(FILTERS.UNCOMPLETED)}>Uncompleted</button>
      </div>
      {sortedTodos.map(todo => (
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      ))}
    </div>
  );
};


