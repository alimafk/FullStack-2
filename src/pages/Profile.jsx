import { useState } from 'react'
import { Link } from 'react-router-dom'

function Profile({ user }) {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })
  const [skills, setSkills] = useState('')
  const [portfolio, setPortfolio] = useState('')
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState('account')
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage('Profile updated successfully!')
    setError('')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleSkillsUpdate = (event) => {
    event.preventDefault()
    setMessage('Skills updated successfully!')
    setError('')
    setTimeout(() => setMessage(''), 3000)
  }

  const handlePasswordChange = (event) => {
    event.preventDefault()
    setMessage('Password changed successfully!')
    setError('')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <section className="page-panel">
      <div className="page-header">
        <div>
          <h1>Profile</h1>
          <p>Manage your account information and preferences.</p>
        </div>
      </div>

      {/* Account Header with Role Badge */}
      <div className="profile-header">
        <div className="role-badge" style={{ backgroundColor: user?.role === 'CLIENT' ? '#3b82f6' : '#8b5cf6' }}>
          {user?.role}
        </div>
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </div>

      {/* Tab Navigation */}
      <div className="profile-tabs">
        <button
          type="button"
          className={`tab-button ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => setActiveTab('account')}
        >
          Account
        </button>
        {user?.role === 'FREELANCER' && (
          <button
            type="button"
            className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            Skills & Portfolio
          </button>
        )}
        <button
          type="button"
          className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
      </div>

      {/* Account Tab */}
      {activeTab === 'account' && (
        <>
          <div className="info-card">
            <h3>Account Details</h3>
            <div className="info-row">
              <span className="label">Role:</span>
              <span className="value">{user?.role}</span>
            </div>
            <div className="info-row">
              <span className="label">Email:</span>
              <span className="value">{user?.email}</span>
            </div>
            <div className="info-row">
              <span className="label">Member since:</span>
              <span className="value">January 2024</span>
            </div>
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            <h3>Edit Account Information</h3>

            <label>
              Full Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email Address
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            {message && <div className="form-message">{message}</div>}
            {error && <div className="error-text">{error}</div>}

            <button type="submit" className="submit-button">Update Profile</button>
          </form>
        </>
      )}

      {/* Skills Tab (Freelancers only) */}
      {activeTab === 'skills' && user?.role === 'FREELANCER' && (
        <>
          <form className="profile-form" onSubmit={handleSkillsUpdate}>
            <h3>Skills & Expertise</h3>

            <label>
              Professional Skills
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                rows="4"
                placeholder="e.g., JavaScript, React, Web Design, UI/UX..."
              />
            </label>

            <label>
              Portfolio/Website Links
              <textarea
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                rows="3"
                placeholder="https://portfolio.com&#10;https://github.com/username&#10;https://dribbble.com/..."
              />
            </label>

            {message && <div className="form-message">{message}</div>}
            {error && <div className="error-text">{error}</div>}

            <button type="submit" className="submit-button">Save Skills</button>
          </form>
        </>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <>
          <form className="profile-form" onSubmit={handlePasswordChange}>
            <h3>Change Password</h3>

            <label>
              Current Password
              <input
                type="password"
                required
                placeholder="Enter current password"
              />
            </label>

            <label>
              New Password
              <input
                type="password"
                required
                placeholder="Enter new password"
              />
            </label>

            <label>
              Confirm New Password
              <input
                type="password"
                required
                placeholder="Confirm new password"
              />
            </label>

            {message && <div className="form-message">{message}</div>}
            {error && <div className="error-text">{error}</div>}

            <button type="submit" className="submit-button">Change Password</button>
          </form>
        </>
      )}

      {/* Quick Navigation */}
      <div className="profile-actions">
        <h3>Quick Actions</h3>
        <div className="action-links">
          {user?.role === 'FREELANCER' ? (
            <>
              <Link to="/jobs" className="action-link">
                Browse Jobs
              </Link>
              <Link to="/applications" className="action-link">
                My Applications
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="action-link">
                Post New Job
              </Link>
              <Link to="/my-jobs" className="action-link">
                Manage Jobs
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Profile