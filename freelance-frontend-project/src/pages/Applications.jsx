import { useEffect, useState } from 'react'

function Applications({ user }) {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const loadApplications = () => {
      try {
        const apps = JSON.parse(localStorage.getItem('freelance_market_applications') || '[]')
        const jobs = JSON.parse(localStorage.getItem('freelance_market_jobs') || '[]')

        const enrichedApps = apps.map((app) => {
          const job = jobs.find((j) => j.id === app.jobId)
          return {
            ...app,
            job,
          }
        }).reverse() // Most recent first

        setApplications(enrichedApps)
      } catch (err) {
        console.error('Error loading applications:', err)
      } finally {
        setLoading(false)
      }
    }

    loadApplications()
  }, [])

  const handleWithdraw = (applicationId) => {
    try {
      const apps = JSON.parse(localStorage.getItem('freelance_market_applications') || '[]')
      const updatedApps = apps.filter((app) => app.id !== applicationId)
      localStorage.setItem('freelance_market_applications', JSON.stringify(updatedApps))
      setApplications(applications.filter((app) => app.id !== applicationId))
      setMessage('Application withdrawn successfully')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      console.error('Error withdrawing application:', err)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b'
      case 'accepted': return '#10b981'
      case 'rejected': return '#ef4444'
      default: return '#6b7280'
    }
  }

  return (
    <section className="page-panel">
      <div className="page-header">
        <div>
          <h1>My Applications</h1>
          <p>Track the status of your job applications.</p>
        </div>
      </div>

      {message && <div className="form-message">{message}</div>}

      {loading ? (
        <p>Loading applications…</p>
      ) : applications.length === 0 ? (
        <div className="empty-state">
          <h3>No applications yet</h3>
          <p>You haven't applied to any jobs. Browse available opportunities to get started.</p>
          <a href="/jobs" className="button primary">Browse Jobs</a>
        </div>
      ) : (
        <div className="applications-list">
          {applications.map((app) => (
            <article key={app.id} className="application-card">
              <div className="app-header">
                <h3>{app.job?.title || 'Job not found'}</h3>
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(app.status) }}
                >
                  {app.status}
                </span>
              </div>

              <p className="job-description">{app.job?.description || 'Job details unavailable'}</p>

              <div className="app-meta">
                <div>
                  <span className="budget">💰 {app.job?.budget || 'N/A'}</span>
                  <span className="applied-date">
                    Applied: {new Date(app.appliedAt).toLocaleDateString()}
                  </span>
                </div>
                {app.status === 'pending' && (
                  <button
                    type="button"
                    className="action-btn reject"
                    onClick={() => handleWithdraw(app.id)}
                  >
                    Withdraw
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Applications