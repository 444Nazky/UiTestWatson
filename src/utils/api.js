// src/utils/api.js
const API_BASE_URL = 'https://your-api.com/api'

export const api = {
  search: async (query) => {
    const response = await fetch(`${API_BASE_URL}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    })
    return await response.json()
  },
  
  uploadFile: async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData
    })
    return await response.json()
  },
  
  // ... other methods
}