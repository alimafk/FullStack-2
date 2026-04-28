import { useEffect, useState } from 'react'

function MyJobs({ user }) {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadJobs = () => {
      try {
        const allJobs = JSON.parse(localStorage.getItem('freelance_market_jobs') || '[]')
        const applications = JSON.parse(localStorage.getItem('freelance_market_applications') || '[]')

        // For now, show all jobs as if posted by this client
        // In a real app, you'd filter by user ID
        const enrichedJobs = allJobs.map((job) => {
          const jobApps = applications.filter((app) => app.jobId === job.id)
          return {
            ...job,
            applications: jobApps,
            applicationCount: jobApps.length,
          }
        }).reverse() // Most recent first

        setJobs(enrichedJobs)
      } catch (err) {
        console.error('Error loading jobs:', err)
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])

  const handleDeleteJob = (jobId) => {
    try {
      const allJobs = JSON.parse(localStorage.getItem('freelance_market_jobs') || '[]')
      const updatedJobs = allJobs.filter((job) => job.id !== jobId)
      localStorage.setItem('freelance_market_jobs', JSON.stringify(updatedJobs))
      setJobs(jobs.filter((job) => job.id !== jobId))
    } catch (err) {
      console.error('Error deleting job:', err)
    }
  }

  const handleStatusChange = (jobId, applicationId, newStatus) => {
    const applications = JSON.parse(localStorage.getItem('freelance_market_applications') || '[]')
    const updatedApps = applications.map((app) =>
      app.id === applicationId ? { ...app, status: newStatus } : app
    )
    localStorage.setItem('freelance_market_applications', JSON.stringify(updatedApps))

    // Update local state
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              applications: job.applications.map((app) =>
                app.id === applicationId ? { ...app, status: newStatus } : app
              ),
            }
          : job
      )
    )
  }

  return (
    <section className="page-panel">
      <div className="page-header">
        <div>
          <h1>My Posted Jobs</h1>
          <p>Manage your job listings and review applications.</p>
        </div>
      </div>

      {loading ? (
        <p>Loading jobs…</p>
      ) : jobs.length === 0 ? (
        <div className="empty-state">
          <h3>No jobs posted yet</h3>
          <p>Post your first job to start receiving applications from freelancers.</p>
          <a href="/dashboard" className="button primary">Post a Job</a>
        </div>
      ) : (
        <div className="jobs-management">
          {jobs.map((job) => (
            <div key={job.id} className="job-management-card">
              <div className="job-header">
                <div>
                  <h3>{job.title}</h3>
                  <div className="job-stats">
                    <span className="stat">{job.applicationCount} applications</span>
                    <span className="budget">💰 {job.budget}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="action-btn reject"
                  onClick={() => handleDeleteJob(job.id)}
                  title="Delete job"
                >
                  Delete
                </button>
              </div>

              <p className="job-description">{job.description}</p>

              {job.applications.length > 0 ? (
                <div className="applications-section">
                  <h4>Applications</h4>
                  <div className="applications-grid">
                    {job.applications.map((app) => (
                      <div key={app.id} className="application-item">
                        <div className="app-info">
                          <span className="applied-date">
                            Applied: {new Date(app.appliedAt).toLocaleDateString()}
                          </span>
                          <span className={`status-badge ${app.status}`}>
                            {app.status}
                          </span>
                        </div>
                        <div className="app-actions">
                          {app.status === 'pending' && (
                            <>
                              <button
                                type="button"
                                className="action-btn accept"
                                onClick={() => handleStatusChange(job.id, app.id, 'accepted')}
                              >
                                Accept
                              </button>
                              <button
                                type="button"
                                className="action-btn reject"
                                onClick={() => handleStatusChange(job.id, app.id, 'rejected')}
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="no-apps">No applications yet</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default MyJobs