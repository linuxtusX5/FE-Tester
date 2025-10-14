import { Routes, Route } from 'react-router-dom'
import Index from './pages/Signup/index'
import Home from './pages/Home'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
function App() {
  return (
      <Routes>
        <Route path='/signup/login' element={<PublicRoute><Index/></PublicRoute>}/>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      </Routes>
  )
}

export default App
