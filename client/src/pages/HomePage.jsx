
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar.jsx'
import SearchBar from '../components/SearchBar.jsx'
import BookGrid from '../components/BookGrid.jsx'
import '../App.css'

const API_URL = import.meta.env.VITE_API_URL

function HomePage() {
  const [search, setSearch] = useState('')
  const [genreId, setGenreId] = useState('')
  const [genres, setGenres] = useState([])

  const handleSearch = useCallback((value) => {
    setSearch(value)
  }, [])

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await axios.get(`${API_URL}/genres`)

        const genreList = Array.isArray(response.data)
          ? response.data
          : response.data.value || response.data.data || []

        setGenres(genreList)
      } catch (error) {
        console.error('Failed to load genres:', error)
      }
    }

    fetchGenres()
  }, [])

  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <section className="welcome">
          <h2>Welcome to the Library</h2>
          <p>Discover, explore and manage your book collection.</p>
        </section>

        <section className="books-section">
          <h2>Our Books</h2>

          <div className="catalogue-controls">
            <SearchBar onSearch={handleSearch} />

            <select
              className="genre-select"
              value={genreId}
              onChange={(event) => setGenreId(event.target.value)}
            >
              <option value="">All Genres</option>

              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <BookGrid search={search} genreId={genreId} />
        </section>
      </main>
    </div>
  )
}

export default HomePage
