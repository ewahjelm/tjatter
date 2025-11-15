import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Login, Register, Chat } from './pages'
import LoginForm from './components/LoginForm'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={ <Login/> }/>
          <Route path='/login' element={ <LoginForm/> }/>
          <Route path='/register' element={ <Register/> }/>
          <Route path='/chat' element={ <Chat/> }/>
        </Routes>
      </Router>
    </AuthProvider>  
  )
}

export default App
