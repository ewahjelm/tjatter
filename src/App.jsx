import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Login, Register, Chat } from './pages'
import LoginForm from './components/LoginForm'

function App() {
  return (
    
    <div className="form-container">
    <LoginForm />
    </div>
/*       <Router>
        <Routes>
          <Route path='/' element={ <Login/> }/>
          <Route path='/login' element={ <Login/> }/>
          <Route path='/register' element={ <Register/> }/>
          <Route path='/chat' element={ <Chat/> }/>
        </Routes>
      </Router> */
  )
}

export default App
