import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Login, Register, Chat } from './pages'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'
import SideNav from './components/SideNav'

function HomeRedirect() {
  const { user } = useAuth()
  return <Navigate to={user ? '/chat' : '/login'} replace />
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <SideNav/>
        <Routes>
          <Route path='/' element={ <HomeRedirect/> }/>
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
