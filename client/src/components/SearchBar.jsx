
import { useEffect, useState } from 'react'

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm)
    }, 400)

    return () => clearTimeout(timer)
  }, [searchTerm, onSearch])

  return (
    <input
      type="text"
      className="search-input"
      placeholder="Search books by title or author..."
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
    />
  )
}

export default SearchBar
