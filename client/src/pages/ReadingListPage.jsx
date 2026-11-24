
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ReadingListContext } from '../context/ReadingListContext.jsx'
import Navbar from '../components/Navbar.jsx'
import '../App.css'

function ReadingListPage() {
  const { readingList, removeBook, clearList } =
    useContext(ReadingListContext)

  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <section className="books-section">
          <h2>My Reading List</h2>

          {readingList.length === 0 ? (
            <p className="status-message">
              Your reading list is empty. Browse the catalogue to add books.
            </p>
          ) : (
            <>
              <div className="book-grid">
                {readingList.map((book) => (
                  <article className="book-card" key={book.id}>
                    <div className="book-info">
                      <span className="book-genre">
                        {book.genre?.name || 'Uncategorised'}
                      </span>

                      <h3>{book.title}</h3>
                      <p className="book-author">By {book.author}</p>

                      <Link
                        to={`/books/${book.id}`}
                        className="details-link"
                      >
                        View Details
                      </Link>

                      <button
                        type="button"
                        onClick={() => removeBook(book.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <button type="button" onClick={clearList}>
                Clear Reading List
              </button>
            </>
          )}
        </section>
      </main>
    </div>
  )
}

export default ReadingListPage
