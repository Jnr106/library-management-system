
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReadingListContext } from '../context/ReadingListContext.jsx'

function Navbar() {
  const { readingList } = useContext(ReadingListContext)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <header className="navbar">
      <h1>Library Management System</h1>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/reading-list">
          Reading List ({readingList.length})
        </Link>
        <Link to="/space-booking">Book a Space</Link>

        {token ? (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Navbar
