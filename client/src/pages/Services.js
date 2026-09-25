import React, { useEffect, useState } from 'react';
import { getServices } from '../api';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getServices()
      .then((res) => setServices(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleRent = (service) => {
    setSelected(service);
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
            <h3>Booking Request</h3>
            <p><strong>{selected.name}</strong></p>
            <p>Total: <strong>${selected.price}</strong> ({selected.duration})</p>
            <p className="modal-note">
              A confirmation email would be sent after submitting your request.
            </p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setSelected(null)}>
                Cancel
              </button>
              <button
                className="btn"
                onClick={() => {
                  alert(`Booking request for "${selected.name}" submitted!`);
                  setSelected(null);
                }}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
