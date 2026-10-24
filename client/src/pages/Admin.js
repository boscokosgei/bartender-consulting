import React, { useEffect, useState } from 'react';
import {
  getServices,
  createService,
  updateService,
  deleteService,
  getAllBookings,
  updateBookingStatus
} from '../api';

const emptyForm = { name: '', description: '', price: '', duration: '', image: '' };

export default function Admin() {
  const [tab, setTab] = useState('services'); // 'services' | 'bookings'
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const refresh = async () => {
    try {
      const [svc, bk] = await Promise.all([getServices(), getAllBookings()]);
      setServices(svc.data);
      setBookings(bk.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      const payload = {
        ...form,
        price: Number(form.price)
      };
      if (editingId) {
        await updateService(editingId, payload);
        setMessage('Service updated');
      } else {
        await createService(payload);
        setMessage('Service created');
      }
      setForm(emptyForm);
      setEditingId(null);
      refresh();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const editService = (s) => {
    setEditingId(s._id);
    setForm({
      name: s.name,
      description: s.description,
      price: s.price,
      duration: s.duration,
      image: s.image || ''
    });
  };

  const removeService = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await deleteService(id);
      setMessage('Service deleted');
      refresh();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const setStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      refresh();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="page">
      <section className="hero">
        <h1>Admin Panel</h1>
        <p>Manage services and bookings</p>
      </section>

      <section className="section">
        <div className="admin-tabs">
          <button
            className={`tab ${tab === 'services' ? 'active' : ''}`}
            onClick={() => setTab('services')}
          >
            Services
          </button>
          <button
            className={`tab ${tab === 'bookings' ? 'active' : ''}`}
            onClick={() => setTab('bookings')}
          >
            Bookings
          </button>
        </div>

        {message && <p className="status" style={{ color: '#4caf50' }}>{message}</p>}
        {error && <p className="status error">{error}</p>}

        {tab === 'services' && (
          <>
            <h2 className="section-title">{editingId ? 'Edit Service' : 'Add Service'}</h2>
            <form className="auth-form" onSubmit={onSubmit} style={{ marginBottom: '2rem' }}>
              <label>
                Name
                <input name="name" value={form.name} onChange={onChange} required />
              </label>
              <label>
                Description
                <input
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  required
                />
              </label>
              <label>
                Price (USD)
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={onChange}
                  required
                  min={0}
                />
              </label>
              <label>
                Duration
                <input
                  name="duration"
                  value={form.duration}
                  onChange={onChange}
                  required
                  placeholder="e.g. 2 hours, per event"
                />
              </label>
              <label>
                Image URL (optional)
                <input name="image" value={form.image} onChange={onChange} />
              </label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn" type="submit">
                  {editingId ? 'Save Changes' : 'Create Service'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditingId(null);
                      setForm(emptyForm);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <h2 className="section-title">Existing Services</h2>
            <div className="admin-list">
              {services.map((s) => (
                <div key={s._id} className="admin-row">
                  <div>
                    <strong>{s.name}</strong>
                    <div style={{ color: '#8888a0', fontSize: '0.9rem' }}>
                      ${s.price} · {s.duration}
                    </div>
                  </div>
                  <div className="admin-actions">
                    <button className="btn-small" onClick={() => editService(s)}>
                      Edit
                    </button>
                    <button className="btn-small btn-danger" onClick={() => removeService(s._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {services.length === 0 && <p className="status">No services yet.</p>}
            </div>
          </>
        )}

        {tab === 'bookings' && (
          <>
            <h2 className="section-title">All Bookings</h2>
            <div className="admin-list">
              {bookings.map((b) => (
                <div key={b._id} className="admin-row">
                  <div>
                    <strong>{b.service?.name}</strong> — {b.user?.name} ({b.user?.email})
                    <div style={{ color: '#8888a0', fontSize: '0.9rem' }}>
                      {new Date(b.eventDate).toLocaleDateString()} · ${b.totalPrice} ·{' '}
                      <span className={`badge badge-${b.status}`}>{b.status}</span>
                    </div>
                  </div>
                  <div className="admin-actions">
                    {b.status !== 'confirmed' && (
                      <button className="btn-small" onClick={() => setStatus(b._id, 'confirmed')}>
                        Confirm
                      </button>
                    )}
                    {b.status !== 'cancelled' && (
                      <button
                        className="btn-small btn-danger"
                        onClick={() => setStatus(b._id, 'cancelled')}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {bookings.length === 0 && <p className="status">No bookings yet.</p>}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
