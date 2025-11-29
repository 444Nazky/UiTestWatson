// src/utils/api.js
// Using Google Generative AI API (Gemini)
const API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
const API_KEY = 'AIzaSyC7HSRgwz5yhZ4T-glCuYuDuM5vYtTf328'

export const api = {
  // AI Search and Answer Generation
  search: async (query) => {
    try {
      const response = await fetch(`${API_BASE_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: query
            }]
          }]
        })
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()
      
      // Extract text from Gemini response
      const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                     'Unable to generate response. Please try again.'

      return {
        success: true,
        data: {
          answer: answer,
          sources: ['api.generativeai.com'],
          timestamp: new Date().toISOString()
        }
      }
    } catch (error) {
      console.error('Search API Error:', error)
      // Fallback to mock response if API fails
      return {
        success: true,
        data: {
          answer: `I apologize, but I couldn't connect to the AI service. Here's a helpful response instead: For the query "${query}", this is typically a topic that benefits from multiple perspectives. Please check your internet connection and try again.`,
          sources: ['fallback'],
          timestamp: new Date().toISOString()
        }
      }
    }
  },

  // Upload file
  uploadFile: async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('https://your-api.com/upload', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        throw new Error('File upload failed')
      }

      return {
        success: true,
        data: {
          filename: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toISOString()
        }
      }
    } catch (error) {
      console.error('Upload Error:', error)
      return {
        success: false,
        error: 'Failed to upload file'
      }
    }
  },

  // Get user notifications
  getNotifications: async () => {
    try {
      return {
        success: true,
        data: {
          count: 3,
          notifications: [
            { id: 1, message: 'New AI features available!', read: false },
            { id: 2, message: 'Your subscription is active', read: false },
            { id: 3, message: 'Check out our latest updates', read: true }
          ]
        }
      }
    } catch (error) {
      console.error('Notifications Error:', error)
      return {
        success: false,
        error: 'Failed to fetch notifications'
      }
    }
  },

  // Save chat history
  saveChatHistory: async (query, response) => {
    try {
      // This could be connected to a backend database
      const chatData = {
        id: Date.now(),
        query,
        response,
        savedAt: new Date().toISOString()
      }
      
      // Store in localStorage for now
      const history = JSON.parse(localStorage.getItem('chatHistory') || '[]')
      history.push(chatData)
      localStorage.setItem('chatHistory', JSON.stringify(history))
      
      return {
        success: true,
        data: chatData
      }
    } catch (error) {
      console.error('Save Chat Error:', error)
      return {
        success: false,
        error: 'Failed to save chat history'
      }
    }
  },

  // Get chat history
  getChatHistory: async () => {
    try {
      const history = JSON.parse(localStorage.getItem('chatHistory') || '[]')
      return {
        success: true,
        data: history
      }
    } catch (error) {
      console.error('Get History Error:', error)
      return {
        success: false,
        error: 'Failed to retrieve chat history'
      }
    }
  }
}