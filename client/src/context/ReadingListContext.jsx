
import { createContext, useEffect, useReducer } from 'react'

export const ReadingListContext = createContext(null)

const STORAGE_KEY = 'library-reading-list'

function loadReadingList() {
  try {
    const savedList = localStorage.getItem(STORAGE_KEY)
    return savedList ? JSON.parse(savedList) : []
  } catch {
    return []
  }
}

function readingListReducer(state, action) {
  switch (action.type) {
    case 'ADD_BOOK': {
      const alreadyExists = state.some(
        (book) => book.id === action.payload.id
      )

      if (alreadyExists) return state

      return [...state, action.payload]
    }

    case 'REMOVE_BOOK':
      return state.filter((book) => book.id !== action.payload)

    case 'CLEAR_LIST':
      return []

    default:
      return state
  }
}

export function ReadingListProvider({ children }) {
  const [readingList, dispatch] = useReducer(
    readingListReducer,
    undefined,
    loadReadingList
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readingList))
  }, [readingList])

  function addBook(book) {
    dispatch({ type: 'ADD_BOOK', payload: book })
  }

  function removeBook(bookId) {
    dispatch({ type: 'REMOVE_BOOK', payload: bookId })
  }

  function clearList() {
    dispatch({ type: 'CLEAR_LIST' })
  }

  return (
    <ReadingListContext.Provider
      value={{ readingList, dispatch, addBook, removeBook, clearList }}
    >
      {children}
    </ReadingListContext.Provider>
  )
}
