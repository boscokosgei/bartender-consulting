import React, { useEffect, useState } from 'react';
import { getServices, createBooking } from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [eventDate, setEventDate] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getServices()
      .then((res) => setServices(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleRent = (service) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setSelected(service);
    setConfirmation(null);
  };

  const submitBooking = async () => {
    if (!eventDate) return setError('Please select an event date');
    setSubmitting(true);
    setError(null);
    try {
      await createBooking({
        serviceId: selected._id,
        eventDate,
        notes
      });
      setConfirmation(`Booking request for "${selected.name}" submitted!`);
      setSelected(null);
      setEventDate('');
      setNotes('');
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <section className="hero hero-alt">
        <h1>Rent Our Services</h1>
        <p>Book professional bartending services for your next event.</p>
      </section>

      <section className="section">
        <h2 className="section-title">Available Services</h2>
        <p className="section-subtitle">Choose the package that fits your event.</p>

        {loading && <p className="status">Loading services...</p>}
        {error && <p className="status error">Error: {error}</p>}
        {confirmation && (
          <p className="status" style={{ color: '#6ee07a' }}>{confirmation}</p>
        )}

        <div className="grid">
          {services.map((s) => (
            <div key={s._id} className="card service-card">
              {s.image && <img src={s.image} alt={s.name} className="card-image" />}
              <div className="card-body">
                <h3>{s.name}</h3>
                <p>{s.description}</p>
                <div className="price-row">
                  <span className="price">${s.price}</span>
                  <span className="duration">{s.duration}</span>
                </div>
                <button className="btn" onClick={() => handleRent(s)}>
                  Rent Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Book "{selected.name}"</h3>
            <p>Price: <strong>${selected.price}</strong> ({selected.duration})</p>

            <label style={{ display: 'block', margin: '1rem 0 0.4rem', color: '#b0b0bd', fontSize: '0.9rem' }}>
              Event date
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: '#0f0f14',
                border: '1px solid #2a2a35',
                borderRadius: '8px',
                color: '#e8e8ec'
              }}
            />

            <label style={{ display: 'block', margin: '1rem 0 0.4rem', color: '#b0b0bd', fontSize: '0.9rem' }}>
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: '#0f0f14',
                border: '1px solid #2a2a35',
                borderRadius: '8px',
                color: '#e8e8ec',
                resize: 'vertical'
              }}
            />

            <div className="modal-actions" style={{ marginTop: '1.5rem' }}>
              <button className="btn btn-secondary" onClick={() => setSelected(null)}>
                Cancel
              </button>
              <button className="btn" onClick={submitBooking} disabled={submitting}>
                {submitting ? 'Booking…' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
