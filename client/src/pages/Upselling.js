import React, { useEffect, useState } from 'react';
import { getUpselling } from '../api';

export default function Upselling() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUpselling()
      .then((res) => setItems(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const frontOffice = items.filter((i) => i.category === 'front-office');
  const foodBeverage = items.filter((i) => i.category === 'food-beverage');

  const renderGroup = (title, subtitle, group) => (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      <p className="section-subtitle">{subtitle}</p>
      <div className="grid">
        {group.map((s) => (
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
  );

  return (
    <div className="page">
      <section className="hero">
        <h1>Upselling Solutions</h1>
        <p>Boost revenue through smarter guest interactions — from check-in to dessert.</p>
      </section>

      {loading && <p className="status">Loading upselling solutions...</p>}
      {error && <p className="status error">Error: {error}</p>}

      {!loading && !error && (
        <>
          {renderGroup(
            'Front Office Upselling',
            'Turn every check-in, check-out, and concierge interaction into a revenue opportunity.',
            frontOffice
          )}
          {renderGroup(
            'Food & Beverage Upselling',
            'Grow average ticket size through menu strategy, pairing programs, and staff coaching.',
            foodBeverage
          )}
        </>
      )}
    </div>
  );
}
