import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Text3,
  TodoList,
  Text4,
  TodoList1,
  PaginationContainer,
  ArrowButton,
  Numbutton,
  ButtonContainer, Modal, ModalContent, ModalButton
} from './styled';
import '../App.css';

interface Todo {
  _id: string;
  todo: string;
  status: string;
}

function Todolist() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editedTodo, setEditedTodo] = useState<Todo | null>(null);
  const [showModal, setShowModal] = useState(Boolean)
  const [editedTodoText, setEditedTodoText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 3;

  const getTodos = async () => {
    try {
      const id = localStorage.getItem('userID');
      const { data } = await axios.get(`http://localhost:8080/api/v1/user/all-todo/${id}`);
      if (data?.success) {
        setTodos(data?.userTodo.todos);
        console.log(todos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    console.error = () => {}; // Ignore console.error warnings
  }, []);
  const handleEditButtonClick = (todoId: string) => {
  const todoToEdit = todos.find((todo) => todo._id === todoId);
  if (todoToEdit) {
    setEditedTodoText(todoToEdit.todo);
    setEditedTodo(todoToEdit);
    setShowModal(true);
  }
};

  const handleSaveButtonClick = async () => {
    try {
      if (editedTodo) {
        const { _id } = editedTodo;
        const { data } = await axios.put(`http://localhost:8080/api/v1/user/update-todo/${_id}`, {
          todo: editedTodoText,
        });
        if (data.success) {
          setShowModal(false);
          setEditedTodoText(''); // Clear the edited todo text
          getTodos(); // Refresh the todos after saving
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckboxChange = async (todoId: string) => {
    try {
      const updatedTodos = todos.map((todo) => {
        if (todo._id === todoId) {
          return {
            ...todo,
            status: todo.status === 'completed' ? 'pending' : 'completed',
          };
        }
        return todo;
      });

      setTodos(updatedTodos);

      const { data } = await axios.put(`http://localhost:8080/api/v1/user/done/${todoId}`, {
        status: updatedTodos.find((todo) => todo._id === todoId)?.status,
      });

      if (data.success) {
        console.log('Todo status updated successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleRemoveButtonClick = async (todoId: string) => {
    try {
      const { data } = await axios.delete(`http://localhost:8080/api/v1/user/remove-todo/${todoId}`);
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(todos.length / todosPerPage);

  // Get current todos
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Go to previous page
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Go to next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <>
    {showModal && (
      <Modal>
        <ModalContent>
          {/* Render the contents of the modal */}
          <h2 style={{background: '#fff'}}>Edit Todo</h2>
            <input
              type='text'
              value={editedTodoText}
              onChange={(e) => setEditedTodoText(e.target.value)}
              style={{padding: '10px', borderStyle: 'none', margin: '10px'}}
            />
          {/* ... */}
            <ModalButton onClick={handleSaveButtonClick}>Save</ModalButton>
          <ModalButton onClick={() => setShowModal(false)}>Close</ModalButton>
        </ModalContent>
      </Modal>
    )}
      {todos && todos.length > 0 ? (
        <>
          <TodoList>
            <Text3 style={{ marginBottom: '30px' }}>
              {currentTodos.map((todo) => (
                <label
                  className="container"
                  style={{
                    textDecoration: todo.status === 'completed' ? 'line-through' : 'none',
                  }}
                  key={todo._id}
                >
                    <span className={`todo-text ${todo.status === 'completed' ? 'completed' : ''}`}>
                      {todo.todo}
                    </span>
                  <input
                    type="checkbox"
                    checked={todo.status === 'completed'}
                    disabled={todo.status === 'completed'}
                  />
                  <span className="checkmark"></span>
                  <>
                    {todo.status !== 'completed' ? (
                      <button className='bts'
                        onClick={() => handleCheckboxChange(todo._id)}
                      >
                        Done
                      </button>
                    ) : (
                      <ButtonContainer>
                        <button className='bts2'
                            onClick={() => handleEditButtonClick(todo._id)}
                        >
                          Edit
                        </button>
                        <button className='bts1'
                          onClick={() => handleRemoveButtonClick(todo._id)}
                        >
                          Remove
                        </button>
                      </ButtonContainer>
                    )}
                  </>
                </label>
              ))}
            </Text3>
          </TodoList>
          {totalPages > 1 && (
            <PaginationContainer>
              <ArrowButton disabled={currentPage === 1} onClick={goToPrevPage}>
                &lt;
              </ArrowButton>
              {Array.from({ length: totalPages }).map((_, index) => (
                <Numbutton
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  style={{
                    margin: '0 5px',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: currentPage === index + 1 ? '#DF2060' : 'inherit',
                  }}
                >
                  {index + 1}
                </Numbutton>
              ))}
              <ArrowButton disabled={currentPage === totalPages} onClick={goToNextPage}>
                &gt;
              </ArrowButton>
            </PaginationContainer>
          )}
        </>
      ) : (
        <TodoList1>
          <Text4 style={{ marginBottom: '30px' }}>You have no todo now</Text4>
          <Text4 style={{ marginTop: '20px' }}>Did you just get everything done?</Text4>
        </TodoList1>
      )}
    </>
  );
}

export default Todolist;
