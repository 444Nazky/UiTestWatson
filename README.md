# Perplexity UI - React Application

A beautiful, modern Perplexity-inspired UI built with React, featuring a search interface with real-time interactions and responsive design.

## Features

- ✨ Modern, dark-themed UI design
- 🔍 Interactive search interface
- ⌨️ Keyboard shortcuts (Cmd/Ctrl+K to focus, Enter to search)
- 📱 Responsive sidebar navigation
- 🎨 Smooth animations and transitions
- 💬 Real-time result display with typing animation
- 🎯 Multiple interactive controls and buttons

## Project Structure

```
src/
├── App.jsx       # Main React component with all functionality
├── main.jsx      # Entry point
└── index.css     # All styling

index.html        # HTML template
package.json      # Project dependencies
vite.config.js    # Vite configuration
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm build

# Preview production build
npm preview
```

## Running the App

The app runs on `http://localhost:3000/` by default.

### Keyboard Shortcuts

- **Cmd/Ctrl + K** - Focus search input
- **Enter** - Submit search
- **Escape** - Clear search and results

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Styling with animations

## Features

### Navigation
- Sidebar with multiple navigation items (Home, Discover, Spaces, Finance)
- Active state indicator
- Plus button for new chat

### Search Interface
- Main search input with placeholder
- Multiple control buttons (search, add content, attachments, language, focus mode, settings)
- Submit button with gradient styling
- Focus state styling

### Results Display
- Answer container with typing animation
- Result icon and title
- Formatted content display
- Smooth fade-in animation

### Bottom Controls
- Notifications bell with dot indicator
- Account avatar
- Upgrade notification
- Install option

## Color Scheme

- Background: `#1a1a1a`
- Sidebar: `#0d0d0d`
- Container: `#262626`
- Accent: `#20b8cd`
- Text: `#ffffff`
- Secondary: `#808080`

## License

MIT
