import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Login, Register, Chat } from './pages'
import LoginForm from './components/LoginForm'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={ <Login/> }/>
          <Route path='/login' element={ <Login/> }/>
          <Route path='/register' element={ <Register/> }/>
          <Route 
            path='/chat' 
            element={ 
              <ProtectedRoute>
                <Chat/>
              </ProtectedRoute> 
            }
          />
        </Routes>
      </AuthProvider>  
    </Router>
  )
}

export default App
