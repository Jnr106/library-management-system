
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ReadingListContext } from '../context/ReadingListContext.jsx'

function BookCard({ book }) {
  const { readingList, addBook, removeBook } =
    useContext(ReadingListContext)

  const isAdded = readingList.some(
    (item) => item.id === book.id
  )

  function handleReadingList() {
    if (isAdded) {
      removeBook(book.id)
    } else {
      addBook(book)
    }
  }

  return (
    <article className="book-card">
      <div className="book-cover">
        <span>📚</span>
      </div>

      <div className="book-info">
        <span className="book-genre">
          {book.genre?.name || 'Uncategorised'}
        </span>

        <h3>{book.title}</h3>
        <p className="book-author">By {book.author}</p>
        <p className="book-year">
          Published: {book.publishedYear || 'Unknown'}
        </p>

        <div className="book-actions">
          <Link to={`/books/${book.id}`} className="details-link">
            View Details
          </Link>

          <button
            type="button"
            onClick={handleReadingList}
            className="reading-list-button"
          >
            {isAdded ? 'Remove from Reading List' : 'Add to Reading List'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default BookCard
