
import { useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from './BookCard.jsx'

const API_URL = import.meta.env.VITE_API_URL

function BookGrid({ search, genreId }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function fetchBooks() {
      try {
        setLoading(true)
        setError('')

        const params = {}

        if (search) params.search = search
        if (genreId) params.genreId = genreId

        const response = await axios.get(`${API_URL}/books`, { params })

        const bookList = Array.isArray(response.data)
          ? response.data
          : response.data.value || response.data.data || []

        if (!cancelled) {
          setBooks(bookList)
        }
      } catch (err) {
        if (!cancelled) {
          setError('Unable to load books. Please try again.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchBooks()

    return () => {
      cancelled = true
    }
  }, [search, genreId])

  if (loading) return <p className="status-message">Loading books...</p>

  if (error) return <p className="error-message">{error}</p>

  if (books.length === 0) {
    return <p className="status-message">No books found.</p>
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}

export default BookGrid
