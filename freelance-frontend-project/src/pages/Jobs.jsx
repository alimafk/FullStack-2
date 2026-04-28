import { useEffect, useState } from 'react'
import { fetchJobs, applyToJob } from '../api'

function Jobs({ user }) {
  const [jobs, setJobs] = useState([])
  const [appliedJobs, setAppliedJobs] = useState(new Set())
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const result = await fetchJobs()
        const jobsList = result.jobs || (Array.isArray(result) ? result : [])
        setJobs(jobsList)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
    const applications = JSON.parse(localStorage.getItem('freelance_market_applications') || '[]')
    setAppliedJobs(new Set(applications.map((app) => app.jobId)))
  }, [])

  const handleApply = async (jobId) => {
    setStatus('')
    setError('')
    try {
      await applyToJob(jobId)
      setAppliedJobs((prev) => new Set([...prev, jobId]))
      setStatus('✓ Application sent! The client will be notified.')
      setTimeout(() => setStatus(''), 4000)
    } catch (err) {
      setError(err.message)
    }
  }

  const filteredJobs = jobs.filter((job) => {
    if (filter === 'applied') return appliedJobs.has(job.id)
    return true
  })

  return (
    <section className="page-panel">
      <div className="page-header">
        <div>
          <h1>Job Listings</h1>
          <p>
            {user?.role === 'FREELANCER'
              ? 'Browse active listings and apply to opportunities that match your skills.'
              : 'View all posted jobs on the marketplace.'}
          </p>
        </div>
      </div>

      {user?.role === 'FREELANCER' && (
        <div className="filter-tabs">
          <button
            type="button"
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({jobs.length})
          </button>
          <button
            type="button"
            className={`filter-button ${filter === 'applied' ? 'active' : ''}`}
            onClick={() => setFilter('applied')}
          >
            Applied ({appliedJobs.size})
          </button>
        </div>
      )}

      {status && <div className="form-message">{status}</div>}
      {error && <div className="error-text">{error}</div>}

      {loading ? (
        <p>Loading jobs…</p>
      ) : filteredJobs.length === 0 ? (
        <p>
          {filter === 'applied'
            ? 'You haven\'t applied to any jobs yet.'
            : 'No jobs are available yet. Check back soon.'}
        </p>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.map((job) => {
            const jobId = job.id
            const isApplied = appliedJobs.has(jobId)
            return (
              <article key={jobId} className="job-card">
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <div className="job-meta">
                  <span className="job-budget">💰 {job.budget}</span>
                  {job.status && <span className="job-status">{job.status}</span>}
                </div>
                {user?.role === 'FREELANCER' && (
                  <button
                    type="button"
                    className={`apply-button ${isApplied ? 'applied' : ''}`}
                    onClick={() => handleApply(jobId)}
                    disabled={isApplied}
                  >
                    {isApplied ? '✓ Applied' : 'Apply'}
                  </button>
                )}
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default Jobs
