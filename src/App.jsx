import React, { useState, useRef, useEffect } from 'react'
import { api } from './utils/api'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [resultContent, setResultContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeNav, setActiveNav] = useState('home')
  const [searchContainerFocused, setSearchContainerFocused] = useState(false)
  const [error, setError] = useState(null)
  const searchInputRef = useRef(null)
  const searchContainerRef = useRef(null)

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }

      if (e.key === 'Escape') {
        setSearchQuery('')
        setShowResult(false)
        setError(null)
      }

      if (e.key === 'Enter' && searchQuery.trim()) {
        handleSubmit()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchQuery])

  const handleSubmit = async () => {
    if (searchQuery.trim() === '') {
      setError('Please enter a search query!')
      return
    }

    setShowResult(true)
    setIsLoading(true)
    setError(null)
    setResultContent(
      <div className="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    )

    // Call API using utils/api.js
    const response = await api.search(searchQuery)
    
    if (response.success) {
      setResultContent(response.data.answer)
      // Save to chat history
      await api.saveChatHistory(searchQuery, response.data.answer)
    } else {
      setError(response.error || 'Something went wrong. Please try again.')
      setResultContent('Failed to get response. Please try again.')
    }
    
    setIsLoading(false)
  }

  const handleNewChat = () => {
    setSearchQuery('')
    setShowResult(false)
    setError(null)
    console.log('Starting new chat')
  }

  const handleNavigation = (section) => {
    setActiveNav(section)
    console.log(`Navigated to: ${section}`)
  }

  const handleSearch = () => {
    console.log('Search mode activated')
  }

  const handleAddContent = () => {
    console.log('Add content clicked')
  }

  const handleAttachment = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*,.pdf,.doc,.docx'
    input.onchange = async (e) => {
      const file = e.target.files[0]
      if (file) {
        console.log('Uploading file...')
        const response = await api.uploadFile(file)
        
        if (response.success) {
          alert(`File uploaded successfully: ${response.data.filename}`)
        } else {
          alert('Failed to upload file')
        }
      }
    }
    input.click()
  }

  const handleLanguage = () => {
    const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese']
    const selectedLang = languages[Math.floor(Math.random() * languages.length)]
    console.log(`Language changed to: ${selectedLang}`)
  }

  const handleFocus = () => {
    console.log('Focus mode toggled')
  }

  const handleSettings = () => {
    console.log('Settings opened')
  }

  const handleNotifications = async () => {
    console.log('Fetching notifications...')
    const response = await api.getNotifications()
    
    if (response.success) {
      const unreadCount = response.data.notifications.filter(n => !n.read).length
      alert(`You have ${unreadCount} unread notifications!`)
    } else {
      alert('Failed to fetch notifications')
    }
  }

  const handleAccount = () => {
    console.log('Account clicked')
  }

  const handleUpgrade = () => {
    console.log('Upgrade clicked')
  }

  const handleInstall = () => {
    console.log('Install clicked')
  }

  const handleLanguageSettings = () => {
    console.log('Language settings clicked')
  }

  const handleHelp = () => {
    console.log('Help clicked')
  }

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <svg viewBox="0 0 24 24">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" />
            <path d="M2 17L12 22L22 17" />
            <path d="M2 12L12 17L22 12" />
          </svg>
        </div>

        <div className="plus-btn" onClick={handleNewChat}>
          <svg viewBox="0 0 24 24" fill="none">
            <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2" strokeLinecap="round" />
            <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div
          className={`nav-item ${activeNav === 'home' ? 'active' : ''}`}
          onClick={() => handleNavigation('home')}
        >
          <svg viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>Home</span>
        </div>

        <div
          className={`nav-item ${activeNav === 'discover' ? 'active' : ''}`}
          onClick={() => handleNavigation('discover')}
        >
          <svg viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" fill="currentColor" />
            <rect x="14" y="3" width="7" height="7" fill="currentColor" />
            <rect x="3" y="14" width="7" height="7" fill="currentColor" />
            <rect x="14" y="14" width="7" height="7" fill="currentColor" />
          </svg>
          <span>Discover</span>
        </div>

        <div
          className={`nav-item ${activeNav === 'spaces' ? 'active' : ''}`}
          onClick={() => handleNavigation('spaces')}
        >
          <svg viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="9" y1="3" x2="9" y2="21" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span>Spaces</span>
        </div>

        <div
          className={`nav-item ${activeNav === 'finance' ? 'active' : ''}`}
          onClick={() => handleNavigation('finance')}
        >
          <svg viewBox="0 0 24 24">
            <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3z" fill="currentColor" />
            <path d="M17.5 14L21 17.5L17.5 21L14 17.5z" fill="currentColor" />
          </svg>
          <span>Finance</span>
        </div>

        <div className="spacer"></div>

        <div className="bottom-items">
          <div className="icon-btn" onClick={handleNotifications}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="icon-btn" onClick={handleAccount}>
            <div className="avatar">AI</div>
          </div>

          <div className="icon-btn" onClick={handleUpgrade}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeWidth="2" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <div className="notification-dot"></div>
          </div>

          <div className="icon-btn" onClick={handleInstall}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="7 10 12 15 17 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="15" x2="12" y2="3" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className="notification-dot"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1 className="title">Header</h1>

        {error && (
          <div style={{
            color: '#ff4444',
            marginBottom: '20px',
            padding: '12px 20px',
            backgroundColor: 'rgba(255, 68, 68, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 68, 68, 0.3)'
          }}>
            {error}
          </div>
        )}

        <div
          className={`search-container ${searchContainerFocused ? 'focused' : ''}`}
          ref={searchContainerRef}
        >
          <input
            type="text"
            className="search-input"
            ref={searchInputRef}
            placeholder="Ask anything. Type @ for mentions."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchContainerFocused(true)}
            onBlur={() => setSearchContainerFocused(false)}
          />

          <div className="search-controls">
            <div className="left-controls">
              <button className="control-btn" onClick={handleSearch}>
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" strokeWidth="2" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <button className="control-btn" onClick={handleAddContent}>
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                  <line x1="8" y1="12" x2="16" y2="12" strokeWidth="2" strokeLinecap="round" />
                  <line x1="12" y1="8" x2="12" y2="16" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <button className="control-btn" onClick={handleAttachment}>
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="right-controls">
              <button className="control-btn" onClick={handleLanguage}>
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <line x1="2" y1="12" x2="22" y2="12" strokeWidth="2" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="2" />
                </svg>
              </button>
              <button className="control-btn" onClick={handleFocus}>
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" strokeWidth="2" />
                  <path d="M12 1v6m0 6v6M1 12h6m6 0h6" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <button className="control-btn" onClick={handleAttachment}>
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="control-btn" onClick={handleSettings}>
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <line x1="12" y1="8" x2="12" y2="16" strokeWidth="2" strokeLinecap="round" />
                  <line x1="8" y1="12" x2="16" y2="12" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <button 
                className="submit-btn" 
                onClick={handleSubmit}
                disabled={isLoading}
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 19V5M5 12l7-7 7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {showResult && (
          <div className="result-container show">
            <div className="result-header">
              <div className="result-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="result-title">Answer</div>
            </div>
            <div className="result-content">{resultContent}</div>
          </div>
        )}

        <div className="footer-icons">
          <button className="footer-icon" onClick={handleLanguageSettings}>
            <svg viewBox="0 0 24 24">
              <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
            </svg>
          </button>
          <button className="footer-icon" onClick={handleHelp}>
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M12 16v-4m0-4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default App