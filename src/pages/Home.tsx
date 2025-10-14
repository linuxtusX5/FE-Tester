import {useState} from 'react'
import {Wrap, Form, Text2, ForInput, Circle3, Input, Input2, Search, Create, ForSearch, Modal, ModalContent, ModalButton,Logout}  from './styled'
import Todolist from './Todolist';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  const id = localStorage.getItem('userID')
  const [todos, setTodo] = useState({
    'TD': '',
    'user': '',
    'status': ''
  })
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(Boolean)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    }

    const handleCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
        const {data} = await axios.post('http://localhost:8080/api/v1/user/create-todo',{
          todo: todos.TD,
          status: '',
          user: id
        });
        if(data?.success){
          window.location.reload();
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    }
    const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) =>{
      e.preventDefault();
      try {
        console.log(search)
      } catch (error) {
        console.log(error)
      }
    }
      const handleLogout = () => {
    setShowModal(true);
  };

  const handleLogoutConfirm = () => {
        localStorage.clear();
        window.location.reload();
        navigate('/')
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <Wrap>
      <Logout onClick={handleLogout}>Logout</Logout>
      {showModal && (
        <Modal>
          <ModalContent>
            <h2 style={{background: '#fff'}}>Confirm Logout</h2>
            <p style={{background: '#fff'}}>Are you sure you want to logout?</p>
            <ModalButton onClick={handleLogoutConfirm}>Logout</ModalButton>
            <ModalButton onClick={handleModalClose}>Cancel</ModalButton>
          </ModalContent>
        </Modal>
      )}
    <Form>
        <Text2>
                My todos
        </Text2>
        <ForInput>
            <Circle3/>
            <Input type='text' value={todos.TD} name='TD' id='todos' placeholder='create a todo...' onChange={handleChange}/>
        </ForInput>
        <ForSearch>
            <Input2 type='text' value={search} id='search' placeholder='search todo...' onChange={handleChangeSearch}/>
        <Search onClick={handleSearch}>Search</Search>
        <Create onClick={handleCreate}>Create</Create>
        </ForSearch>
    </Form> 
    <Todolist/>
    </Wrap>
  )
}

export default Home