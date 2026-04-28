import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createJob, fetchJobs } from '../api'

function Dashboard({ user }) {
  const [form, setForm] = useState({ title: '', description: '', budget: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [jobsCount, setJobsCount] = useState(0)
  const [applicationsCount, setApplicationsCount] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const jobs = await fetchJobs()
        const jobsList = jobs.jobs || []
        setJobsCount(jobsList.length)

        if (user?.role === 'FREELANCER') {
          const applications = JSON.parse(localStorage.getItem('freelance_market_applications') || '[]')
          setApplicationsCount(applications.length)
        } else {
          // For clients, count total applications across their jobs
          const applications = JSON.parse(localStorage.getItem('freelance_market_applications') || '[]')
          setApplicationsCount(applications.length)
        }
      } catch {
        setJobsCount(0)
        setApplicationsCount(0)
      }
    }

    loadStats()
  }, [user])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      await createJob({
        title: form.title,
        description: form.description,
        budget: form.budget,
      })
      setMessage('Job posted successfully!')
      setForm({ title: '', description: '', budget: '' })
      const jobs = await fetchJobs()
      setJobsCount((jobs.jobs || []).length)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-panel">
      <div className="page-header">
        <div>
          <h1>Welcome back, {user?.name || 'user'}</h1>
          <p>
            You are logged in as a <strong>{user?.role}</strong>. Use the menu to
            review open jobs or submit your next post.
          </p>
        </div>
        <div className="job-label">
          <span>{jobsCount} open jobs</span>
          <span>{user?.role === 'CLIENT' ? 'Client dashboard' : 'Freelancer dashboard'}</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{jobsCount}</h3>
          <p>Open Jobs</p>
        </div>
        <div className="stat-card">
          <h3>{applicationsCount}</h3>
          <p>{user?.role === 'CLIENT' ? 'Total Applications' : 'My Applications'}</p>
        </div>
        <div className="stat-card">
          <h3>{user?.role === 'CLIENT' ? 'Active' : 'Available'}</h3>
          <p>Status</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-links">
          <Link to="/jobs" className="action-link">
            <span className="action-icon">🔍</span>
            Browse Jobs
          </Link>
          <Link to="/profile" className="action-link">
            <span className="action-icon">👤</span>
            View Profile
          </Link>
          {user?.role === 'FREELANCER' ? (
            <Link to="/applications" className="action-link">
              <span className="action-icon">📋</span>
              My Applications
            </Link>
          ) : (
            <Link to="/my-jobs" className="action-link">
              <span className="action-icon">💼</span>
              Manage Jobs
            </Link>
          )}
        </div>
      </div>

      {user?.role === 'CLIENT' ? (
        <div className="page-panel">
          <h2>Post a new job</h2>
          <p>Clients can create new work opportunities with a title, description, and budget.</p>
          <form className="job-form" onSubmit={handleSubmit}>
            <label>
              Job title
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                required
              />
            </label>

            <label>
              Budget
              <input
                type="text"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                placeholder="$2,000"
                required
              />
            </label>

            {error && <div className="error-text">{error}</div>}
            {message && <div className="form-message">{message}</div>}

            <button type="submit" disabled={loading}>
              {loading ? 'Posting…' : 'Post Job'}
            </button>
          </form>
        </div>
      ) : (
        <div className="page-panel">
          <h2>Find your next opportunity</h2>
          <p>
            Freelancers can browse open listings on the Jobs page and apply to work
            with a single click. Check your applications to track your progress.
          </p>
        </div>
      )}
    </section>
  )
}

export default Dashboard
