const API_BASE_URL = 'http://localhost:8080/api'

// Helper function to get auth token
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem('freelance_market_user') || 'null')
  return user?.token
}

// Helper function to make authenticated requests
const authenticatedFetch = async (url, options = {}) => {
  const token = getAuthToken()
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

// Mock delay for consistency with old API
const wait = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms))

export const login = async ({ email, password }) => {
  await wait()
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText || 'Login failed')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message || 'Login failed')
  }
}

export const register = async ({ name, email, password, role }) => {
  await wait()
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText || 'Registration failed')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message || 'Registration failed')
  }
}

export const fetchJobs = async () => {
  await wait()
  return authenticatedFetch('/jobs')
}

export const createJob = async ({ title, description, budget }) => {
  await wait()
  return authenticatedFetch('/jobs', {
    method: 'POST',
    body: JSON.stringify({ title, description, budget }),
  })
}

export const applyToJob = async (jobId) => {
  await wait()
  return authenticatedFetch(`/jobs/${jobId}/apply`, {
    method: 'POST',
  })
}

export const saveUser = (user) => {
  localStorage.setItem('freelance_market_user', JSON.stringify(user))
}

export const getSavedUser = () => {
  try {
    return JSON.parse(localStorage.getItem('freelance_market_user')) || null
  } catch {
    return null
  }
}

export const clearSavedUser = () => {
  localStorage.removeItem('freelance_market_user')
}
