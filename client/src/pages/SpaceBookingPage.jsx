
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

function SpaceBookingPage() {
  const [spaceId, setSpaceId] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const spaces = [
    { id: '1', name: 'Study Room 1' },
    { id: '2', name: 'Study Room 2' },
    { id: '3', name: 'Computer Lab' },
    { id: '4', name: 'Meeting Room' },
  ]

  function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setError('')

    if (endTime <= startTime) {
      setError('End time must be later than start time.')
      return
    }

    setMessage(
      'Booking details captured successfully. Booking submission will be connected to the backend when the booking API is available.'
    )

    setSpaceId('')
    setDate('')
    setStartTime('')
    setEndTime('')
  }

  return (
    <main className="main-content auth-page">
      <section className="auth-card">
        <h2>Book a Library Space</h2>
        <p>Select a space and choose your preferred booking time.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="spaceId">Select Space</label>
          <select
            id="spaceId"
            value={spaceId}
            onChange={(event) => setSpaceId(event.target.value)}
            required
          >
            <option value="">Choose a space</option>
            {spaces.map((space) => (
              <option key={space.id} value={space.id}>
                {space.name}
              </option>
            ))}
          </select>

          <label htmlFor="date">Booking Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />

          <label htmlFor="startTime">Start Time</label>
          <input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
            required
          />

          <label htmlFor="endTime">End Time</label>
          <input
            id="endTime"
            type="time"
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}
          {message && <p className="status-message">{message}</p>}

          <button type="submit">Submit Booking</button>
        </form>

        <Link to="/">Back to Home</Link>
      </section>
    </main>
  )
}

export default SpaceBookingPage
