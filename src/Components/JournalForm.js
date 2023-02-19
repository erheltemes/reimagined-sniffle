import React, { useState } from 'react';

function JournalForm() {
  const [entry, setEntry] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [autoDate, setAutoDate] = useState(false);
  const [autoTime, setAutoTime] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Combine the date and time into a single timestamp
    let timestamp;
    if (autoDate || autoTime) {
      timestamp = new Date();
    } else {
      timestamp = new Date(`${date}T${time}`);
    }

    // Validate the timestamp
    if (isNaN(timestamp)) {
      alert('Please enter a valid date and time.');
      return;
    }

    // Send a POST request to save the journal entry to the database
    const response = await fetch('/api/journal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        entry,
        timestamp,
      }),
    });

    if (response.ok) {
      // Clear the form
      setEntry('');
      setDate('');
      setTime('');
      setAutoDate(false);
      setAutoTime(false);
    } else {
      alert('Failed to save journal entry.');
    }
  };

  return (
    <form className="journal-form" onSubmit={handleSubmit}>
      <label className="journal-form__label">
        Journal Entry:
        <textarea className="journal-form__input" value={entry} onChange={(event) => setEntry(event.target.value)} />
      </label>
      <label className="journal-form__label">
        Date:
        {autoDate ? (
          <span>{new Date().toLocaleDateString()}</span>
        ) : (
          <input className="journal-form__input" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        )}
        <input
          className="journal-form__checkbox"
          type="checkbox"
          checked={autoDate}
          onChange={(event) => setAutoDate(event.target.checked)}
        />
        Auto
      </label>
      <label className="journal-form__label">
        Time:
        {autoTime ? (
          <span>{new Date().toLocaleTimeString()}</span>
        ) : (
          <input className="journal-form__input" type="time" value={time} onChange={(event) => setTime(event.target.value)} />
        )}
        <input
          className="journal-form__checkbox"
          type="checkbox"
          checked={autoTime}
          onChange={(event) => setAutoTime(event.target.checked)}
        />
        Auto
      </label>
      <button className="journal-form__button" type="submit">Save Entry</button>
    </form>
  );
}

export default JournalForm;
