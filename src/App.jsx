import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import { getSavedUser, clearSavedUser, saveUser } from './api'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import Profile from './pages/Profile'
import Applications from './pages/Applications'
import MyJobs from './pages/MyJobs'
import './App.css'

const PrivateRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  const [user, setUser] = useState(getSavedUser())
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      saveUser(user)
    } else {
      clearSavedUser()
    }
  }, [user])

  const handleLogout = () => {
    setUser(null)
    navigate('/login')
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="brand">Freelance Job Marketplace</div>
        <nav className="app-nav">
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/jobs">Jobs</Link>
              {user.role === 'FREELANCER' ? (
                <Link to="/applications">Applications</Link>
              ) : (
                <Link to="/my-jobs">My Jobs</Link>
              )}
              <Link to="/profile">Profile</Link>
              <button type="button" className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
          <Route path="/login" element={<Login user={user} onLogin={setUser} />} />
          <Route path="/register" element={<Register user={user} onRegister={setUser} />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute user={user}>
                <Dashboard user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <PrivateRoute user={user}>
                <Jobs user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute user={user}>
                <Profile user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <PrivateRoute user={user}>
                <Applications user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-jobs"
            element={
              <PrivateRoute user={user}>
                <MyJobs user={user} />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

export default AppWrapper
