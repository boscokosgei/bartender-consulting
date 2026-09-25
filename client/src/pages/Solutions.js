import React, { useEffect, useState } from 'react';
import { getSolutions } from '../api';

export default function Solutions() {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSolutions()
      .then((res) => setSolutions(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <section className="hero">
        <h1>Elevate Your Bar Experience</h1>
        <p>Expert consulting solutions for bars, restaurants, and events.</p>
      </section>

      <section className="section">
        <h2 className="section-title">Our Consulting Solutions</h2>
        <p className="section-subtitle">Tailored strategies to make your beverage program unforgettable.</p>

        {loading && <p className="status">Loading solutions...</p>}
        {error && <p className="status error">Error: {error}</p>}

        <div className="grid">
          {solutions.map((s) => (
            <div key={s._id} className="card">
              <div className="card-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <ul className="feature-list">
                {s.features?.map((f, i) => (
                  <li key={i}>✓ {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
