        // Search functionality
        function handleSubmit() {
            const input = document.getElementById('searchInput');
            const query = input.value.trim();
            
            if (query === '') {
                alert('Please enter a search query!');
                return;
            }

            const resultContainer = document.getElementById('resultContainer');
            const resultContent = document.getElementById('resultContent');
            
            // Show loading state
            resultContainer.classList.add('show');
            resultContent.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
            
            // Simulate AI response
            setTimeout(() => {
                const responses = [
                    `Based on your query "${query}", here's what I found: This is a comprehensive answer that provides detailed information about your topic. The search results indicate multiple relevant sources that can help answer your question.`,
                    `Great question about "${query}"! After analyzing various sources, I can tell you that this is a complex topic with several interesting aspects to consider. Let me break this down for you in detail.`,
                    `Searching for "${query}"... I've found some fascinating insights! This topic has been discussed extensively, and there are multiple perspectives worth considering. Here's a summary of the key findings.`
                ];
                
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                resultContent.innerHTML = randomResponse;
            }, 1500);
        }

        // Handle Enter key press
        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                handleSubmit();
            }
        }

        // Navigation handlers
        function handleNavigation(section) {
            // Remove active class from all nav items
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked item
            event.currentTarget.classList.add('active');
            
            console.log(`Navigated to: ${section}`);
            alert(`Navigating to ${section.charAt(0).toUpperCase() + section.slice(1)} section`);
        }

        // New chat handler
        function handleNewChat() {
            const input = document.getElementById('searchInput');
            const resultContainer = document.getElementById('resultContainer');
            
            input.value = '';
            resultContainer.classList.remove('show');
            
            console.log('Starting new chat');
            alert('Starting a new chat!');
        }

        // Control button handlers
        function handleSearch() {
            console.log('Search mode activated');
            alert('Search mode activated!');
        }

        function handleAddContent() {
            console.log('Add content clicked');
            alert('Add content feature!');
        }

        function handleAttachment() {
            console.log('Attachment button clicked');
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*,.pdf,.doc,.docx';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    alert(`File selected: ${file.name}`);
                }
            };
            input.click();
        }

        function handleLanguage() {
            console.log('Language selector clicked');
            const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'];
            const selectedLang = languages[Math.floor(Math.random() * languages.length)];
            alert(`Language: ${selectedLang}`);
        }

        function handleFocus() {
            console.log('Focus mode toggled');
            alert('Focus mode toggled!');
        }

        function handleSettings() {
            console.log('Settings opened');
            alert('Opening settings...');
        }

        // Bottom bar handlers
        function handleNotifications() {
            console.log('Notifications clicked');
            alert('You have 3 new notifications!');
        }

        function handleAccount() {
            console.log('Account clicked');
            alert('Opening account settings...');
        }

        function handleUpgrade() {
            console.log('Upgrade clicked');
            alert('Upgrade to Premium for unlimited searches!');
        }

        function handleInstall() {
            console.log('Install clicked');
            alert('Install the Perplexity app for a better experience!');
        }

        // Footer handlers
        function handleLanguageSettings() {
            console.log('Language settings clicked');
            alert('Change language preferences');
        }

        function handleHelp() {
            console.log('Help clicked');
            alert('How can we help you today?');
        }

        // Initialize
        console.log('Perplexity Interface Loaded');
        
        // Add some animation on load
        window.addEventListener('load', () => {
            const title = document.querySelector('.title');
            title.style.opacity = '0';
            title.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                title.style.transition = 'all 0.8s ease';
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, 100);
        });

        // Search input focus animation
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('focus', () => {
            document.querySelector('.search-container').style.borderColor = '#20b8cd';
        });

        searchInput.addEventListener('blur', () => {
            document.querySelector('.search-container').style.borderColor = '#333333';
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
            
            // Escape to clear
            if (e.key === 'Escape') {
                searchInput.value = '';
                document.getElementById('resultContainer').classList.remove('show');
            }
        });