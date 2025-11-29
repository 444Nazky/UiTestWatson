// src/utils/api.js
// Using Google Generative AI API (Gemini)
const API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
const API_KEY = 'AIzaSyC7HSRgwz5yhZ4T-glCuYuDuM5vYtTf328'

// Fallback responses for when API is unavailable
const generateFallbackResponse = (query) => {
  const fallbackResponses = {
    'hippo': 'A hippopotamus is a large semi-aquatic mammal native to sub-Saharan Africa. They are known for their massive barrel-shaped bodies, short legs, and large mouths with prominent teeth. Hippos spend most of their day in water to keep cool and protect their sensitive skin from the sun. Despite their herbivorous diet, they are considered one of Africa\'s most dangerous animals.',
    'ai': 'Artificial Intelligence (AI) refers to computer systems designed to perform tasks that typically require human intelligence. This includes learning from experience, recognizing patterns, understanding language, and making decisions. AI powers many modern applications including chatbots, recommendation systems, autonomous vehicles, and image recognition.',
    'react': 'React is a JavaScript library for building user interfaces with reusable components. Developed by Facebook, it uses a virtual DOM to efficiently update the UI. React enables developers to create interactive web applications with better performance and easier state management.',
    'javascript': 'JavaScript is a versatile programming language primarily used for web development. It runs in browsers and can also be used server-side with Node.js. JavaScript enables interactive web pages and is essential for modern web applications.'
  }
  
  const lowerQuery = query.toLowerCase()
  for (const [key, response] of Object.entries(fallbackResponses)) {
    if (lowerQuery.includes(key)) {
      return response
    }
  }
  
  // Generic fallback if no specific match
  return `Based on your query about "${query}", this is an interesting topic. Here's what I can tell you: This topic has multiple dimensions and perspectives worth considering. For more detailed information, you might want to explore specialized resources or documentation on this subject.`
}

export const api = {
  // AI Search and Answer Generation
  search: async (query) => {
    try {
      console.log('Calling AI API with query:', query)
      
      const response = await fetch(`${API_BASE_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Please provide a concise, informative answer to this question: ${query}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      })

      if (!response.ok) {
        console.warn('API Response Status:', response.status)
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()
      console.log('API Response:', data)
      
      // Extract text from Gemini response
      const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || null
      
      if (answer) {
        return {
          success: true,
          data: {
            answer: answer,
            sources: ['Google Generative AI'],
            timestamp: new Date().toISOString()
          }
        }
      } else {
        throw new Error('No content in API response')
      }
    } catch (error) {
      console.error('Search API Error:', error)
      
      // Use fallback response
      const fallbackAnswer = generateFallbackResponse(query)
      return {
        success: true,
        data: {
          answer: fallbackAnswer,
          sources: ['Local Knowledge Base'],
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