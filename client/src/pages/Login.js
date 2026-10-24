import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    adminCode: ''
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { loginUser, registerUser, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate(user.role === 'admin' ? '/admin' : '/services', { replace: true });
  }

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (mode === 'login') {
        const u = await loginUser(form.email, form.password);
        navigate(u.role === 'admin' ? '/admin' : '/services');
      } else {
        const u = await registerUser(form.name, form.email, form.password, form.adminCode);
        navigate(u.role === 'admin' ? '/admin' : '/services');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <section className="hero">
        <h1>{mode === 'login' ? 'Welcome Back' : 'Create Your Account'}</h1>
        <p>{mode === 'login' ? 'Sign in to book services' : 'Register to book our services'}</p>
      </section>

      <section className="section" style={{ maxWidth: 460, margin: '0 auto' }}>
        <form className="auth-form" onSubmit={onSubmit}>
          {mode === 'register' && (
            <label>
              Name
              <input name="name" value={form.name} onChange={onChange} required />
            </label>
          )}

          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              minLength={6}
              required
            />
          </label>

          {mode === 'register' && (
            <label>
              Admin code (optional — only for staff)
              <input
                name="adminCode"
                value={form.adminCode}
                onChange={onChange}
                placeholder="Leave blank for customer account"
              />
            </label>
          )}

          {error && <p className="status error">{error}</p>}

          <button className="btn" type="submit" disabled={submitting}>
            {submitting ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>

          <p style={{ textAlign: 'center', marginTop: '1rem', color: '#8888a0' }}>
            {mode === 'login' ? (
              <>
                No account?{' '}
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => setMode('register')}
                >
                  Register
                </button>
              </>
            ) : (
              <>
                Already have one?{' '}
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => setMode('login')}
                >
                  Sign In
                </button>
              </>
            )}
          </p>
        </form>
      </section>
    </div>
  );
}
