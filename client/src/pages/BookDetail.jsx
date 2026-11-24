
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

const API_URL = import.meta.env.VITE_API_URL

function BookDetail() {
  const { id } = useParams()

  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true)
        setError('')

        const response = await axios.get(`${API_URL}/books/${id}`)
        setBook(response.data)
      } catch (err) {
        setError('Unable to find this book.')
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  if (loading) {
    return <p className="status-message">Loading book details...</p>
  }

  if (error) {
    return (
      <main className="main-content">
        <p className="error-message">{error}</p>
        <Link to="/">Back to Catalogue</Link>
      </main>
    )
  }

  if (!book) return null

  return (
    <div className="app">
      <header className="navbar">
        <h1>Library Management System</h1>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </header>

      <main className="main-content">
        <section className="book-detail">
          <div className="book-cover detail-cover">
            <span>📚</span>
          </div>

          <div className="book-info">
            <span className="book-genre">
              {book.genre?.name || 'Uncategorised'}
            </span>

            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Published: {book.publishedYear || 'Unknown'}</p>
            <p>ISBN: {book.isbn || 'Not available'}</p>
            <p>Total copies: {book.totalCopies}</p>
            <p>{book.description || 'No description available.'}</p>

            <Link to="/" className="details-link">
              Back to Catalogue
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default BookDetail
